"use client";

import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { RiHeartFill, RiHeartLine } from "react-icons/ri";
import { twMerge } from "tailwind-merge";

interface LikeButtonProps {
    beatId: string;
    className?: string;
}

const LikeButton: React.FC<LikeButtonProps> = ({
    beatId,
    className,
}) => {
    const router = useRouter();

    const {user} = useUser();
    const { supabaseClient } = useSessionContext();
    const [isLiked, setIsLiked] = useState(false)

    const authModal = useAuthModal();

    useEffect(() => {
      if(!user?.id){
        return;
      }

      const fetchBeat = async () => {
        const {data, error} = await supabaseClient
            .from('liked_beats')
            .select("*")
            .eq('user_id', user.id)
            .eq('beat_id', beatId)
            .single()

        if(!error && data){
            setIsLiked(true)
        }
      }
    
      fetchBeat();
    }, [beatId, supabaseClient, user?.id])
    
    const Icon = isLiked ? RiHeartFill : RiHeartLine;

    const handleClick = async () => {
        if(!user){
            return authModal.onOpen();
        }

        if(isLiked){
            const {error} = await supabaseClient
            .from('liked_beats')
            .delete()
            .eq('user_id', user.id)
            .eq('beat_id', beatId)

        if(error){
            toast.error(error.message)
        }else{
            setIsLiked(false)
        }
        }else{
            const {error} = await supabaseClient
            .from('liked_beats')
            .insert({
                beat_id: beatId,
                user_id: user.id
            });
            if(error){
                toast.error(error.message)
            }else{
                setIsLiked(true)
                toast.success('Liked!');
            }
        }
        router.refresh();
    }

    return ( 
        <button className={twMerge(``, className)} onClick={handleClick}>
            <Icon color={isLiked ? "red" : "white"} size={20}/>
        </button>
     );
}
 
export default LikeButton;