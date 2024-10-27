"use client";

import uniqid from "uniqid";
import { useState } from "react";
import useUploadModal from "@/hooks/useUploadModal";
import Modal from "./Modal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "./Input";
import Button from "./Button";
import toast from "react-hot-toast";
import { useUser } from "@/hooks/useUser";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";

const UploadModal = () => {

    const {
        register,
        handleSubmit,
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            author: '',
            title: '',
            song: null,
            image: null,
            key: "",
            bpm: null
        }
    })

    const [isLoading, setIsLoading] = useState(false);
    const uploadModal = useUploadModal();
    const { user } = useUser();
    const supabaseClient = useSupabaseClient();
    const router = useRouter();


    const onChange = (open: boolean) => {
        if (!open) {
            reset();
            uploadModal.onClose();
        }
    }

    const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        try{
            setIsLoading(true);

            const imageFile = values.image?.[0];
            const songFile = values.song?.[0];

            if( !imageFile || !songFile || !user){
                toast.error("Misssing fields");
                return;
            }

            const uniqueID = uniqid();

            const sanitizedTitle = values.title.replace(/[|]/g, '-');

            // upload song
            const {
                data: songData,
                error: songError,
            } = await supabaseClient
                .storage
                .from('beats')
                .upload(`song-${sanitizedTitle}-${uniqueID}`, songFile, {
                    cacheControl: '3600',
                    upsert: false
                });

            if(songError){
                setIsLoading(false);
                return toast.error('Failed song upload.')
            }

            // Upload Image
            const {
                data: imageData,
                error: imageError,
            } = await supabaseClient
                .storage
                .from('images')
                .upload(`image-${sanitizedTitle}-${uniqueID}`, imageFile, {
                    cacheControl: '3600',
                    upsert: false
                });

            if(imageError){
                setIsLoading(false);
                return toast.error('Failed image upload');
            }

            const {
                error: supabaseError
            } = await supabaseClient
                .from('beats')
                .insert({
                    user_id: user.id,
                    title: values.title,
                    author: values.author,
                    image_path: imageData.path,
                    beat_path: songData.path,
                    key: values.key,
                    bpm: values.bpm,
                })

            if(supabaseError){
                setIsLoading(false);
                return toast.error(supabaseError.message)
            }

            router.refresh();
            setIsLoading(false);
            toast.success('Song created!');
            reset();
            uploadModal.onClose();

        }catch (error){
            toast.error("Something went wrong!");
        }finally{
            setIsLoading(false);
        }
    }

    return ( 
        <Modal
            title="Add a beat"
            description="Upload wav, mp3, flac, etc."
            isOpen = {uploadModal.isOpen}
            onChange={onChange}
        >
            <form onSubmit={handleSubmit(onSubmit)} className="
                flex
                flex-col
                gap-y-4
            ">
                <Input
                    id = "title"
                    disabled = {isLoading}
                    {...register('title', { required: true })}
                    placeholder = "Song Title"
                />
                <Input
                    id = "author"
                    disabled = {isLoading}
                    {...register('author', { required: true })}
                    placeholder = "Song Author"
                />
                <div>
                    <div className="pb-1">
                        Select a song file
                    </div>
                    <Input
                    id = "song"
                    type="file"
                    disabled = {isLoading}
                    accept=".mp3"
                    {...register('song', { required: true })}
                />
                </div>
                <div>
                    <div className="pb-1">
                        Select the cover art
                    </div>
                    <Input
                    id = "image"
                    type="file"
                    disabled = {isLoading}
                    accept="image/*"
                    {...register('image', { required: true })}
                />
                </div>
                <div className="flex justify-between items-center w-full gap-2">
                <Input
                    id = "key"
                    disabled = {isLoading}
                    {...register('key', { required: true })}
                    placeholder = "Key (for ex. D#m)"
                />
                <Input
                    id = "bpm"
                    disabled = {isLoading}
                    {...register('bpm', { required: true, valueAsNumber: true })}
                    placeholder = "BPM (for ex. 120)"
                />
                </div>
                <Button disabled={isLoading} type="submit">Create</Button>
            </form>
        </Modal>
     );
}
 
export default UploadModal;