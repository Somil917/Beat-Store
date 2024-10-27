"use client"

import Button from '@/components/Button';
import Input from '@/components/Input'
import useGetUserById from '@/hooks/useGetUserById';
import useLoadAvatarImage from '@/hooks/useLoadAvatarImage';
import { useUser } from '@/hooks/useUser';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast';
import { MdEdit, MdOutlineEdit } from 'react-icons/md';
import uniqid from 'uniqid';

const UserProfileAlter = () => {

    
    const {handleSubmit, reset, register} = useForm<FieldValues>({
        defaultValues: {
            full_name: '',
            biography: '',
            display_name: '',
            image: '',
        }
    });
    
    const [isLoadingState, setIsLoadingState] = useState<boolean>(false)
    const supabaseClient = useSupabaseClient()
    const {user, isLoading} = useUser();
    const router = useRouter();
    const {userDetails} = useGetUserById(user?.id);
    const avatar_url = useLoadAvatarImage(userDetails!);

    useEffect(() => {
        if(!user && !isLoading){
            router.replace('/')
        }
    }, [isLoading, user, router])


    const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        try{
        setIsLoadingState(true)

        const avatarFile = values.image?.[0];

        //upload avatar img
        const { data: avatarData, error: avatarError } = await supabaseClient
            .storage
            .from('images')
            .upload(`avatar-${user?.id}`, avatarFile, {
                cacheControl: '3600',
                upsert: true,
            });

        if(avatarError){
            setIsLoadingState(false)
            return toast.error("avatar upload failed")
        }

        const { error: supabaseError } = await supabaseClient
        .from('users')
        .update({
            full_name: values.full_name,
            biography: values.biography,
            display_name: values.display_name,
            avatar_url: avatarData.path
        })
        .eq('id', user?.id)

        if(supabaseError){
            setIsLoadingState(false)
            return toast.error(supabaseError.message)
        }

        router.refresh();
        setIsLoadingState(false);
        toast.success('Saved Changes')
    }catch{
        toast.error('Something went wrong!')
    }finally{
        setIsLoadingState(false)
    }
    }


  return (
    <div className=' w-full p-4 '>
        <form onSubmit={handleSubmit(onSubmit)} className='flex  p-4 justify-center items-start gap-x-14 w-full'>
            <div className='relative group border border-neutral-700 rounded-full w-[100px] h-[100px]'>
                <Image src={avatar_url || '/images/UserProfile.jpg'} className='rounded-full object-cover' fill alt='avatar' />
                <Input
                className='absolute top-[50%] none w-full h-full left-[50%] translate-x-[-50%] translate-y-[-50%] sr-only'
                disabled={isLoadingState}
                id='image'
                type='file'
                accept='image/*'
                {...register('image')}
                />
                <label htmlFor="image" className='z-10 cursor-pointer h-full w-full justify-center items-center absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] hidden group-hover:flex'>
                    <MdOutlineEdit size={38}/>
                </label>
                <div className='inset-0 bg-neutral-900/50 absolute rounded-full hidden group-hover:block'></div>
            </div>
            <div className='flex flex-col gap-y-8 w-[50%]'>
            <div>
                <div className='pb-1'>
                    User Name
                </div>
                <Input
                disabled={isLoadingState}
                id='full_name'
                {...register('full_name', {required: true})}
                placeholder={userDetails?.full_name || 'Type the Full Name'}
                />
            </div>
            <div>
                <div className='pb-1'>
                    Display Name
                </div>
                <Input
                disabled={isLoadingState}
                id='display_name'
                {...register('display_name', {required: true})}
                placeholder={userDetails?.display_name || 'Type the Display Name'}
                />
            </div>
            <div>
                <div className='pb-1'>
                    Biography
                </div>
                <Input
                disabled={isLoadingState}
                id='biography'
                {...register('biography', {required: true})}
                placeholder={userDetails?.biography || 'Type the Biography'}
                />
            </div>
            <Button className='w-[180px] h-[40px] flex justify-center items-center rounded-md mt-4' disabled={isLoading} type='submit'>Save Changes</Button>
            </div>
        </form>
    </div>
  )
}

export default UserProfileAlter