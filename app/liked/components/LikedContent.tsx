"use client";

import LikeButton from "@/components/LikeButton";
import MediaItem from "@/components/MediaItem";
import useOnPlay from "@/hooks/useOnPlay";
import { useUser } from "@/hooks/useUser";
import { Beat } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface LikedContentProps {
    beats: Beat[]
}

const LikedContent: React.FC<LikedContentProps> = ({
    beats
}) => {
    const onPlay = useOnPlay(beats);
    const router = useRouter();
    const { isLoading, user } = useUser();

    useEffect(() => {
        if(!user && !isLoading){
            router.replace('/')
        }
    }, [isLoading, user, router])

    if(beats.length === 0){
        return (
            <div 
            className="
            flex
            justify-center
            gap-y-2
            w-full
            px-6
            text-neutral-400
            "
            >
                No results found.
            </div>
        )
    }

    return ( 
        <div className="
        flex
        flex-col
        w-full
        gap-y-2 
        min-h-screen
        mt-16
        px-40
        py-11
        ">
            {beats.map((beat) => (<div className="
            flex
            items-center
            justify-between
            w-full
            pr-4
            rounded-md
          bg-neutral-800/50 
            gap-x-4
            " key={beat.id}>
                <MediaItem data={beat} onClick={(id: string) => onPlay(id)}/>
                <LikeButton beatId={beat.id}/>
            </div>))}
        </div>
     );
}
 
export default LikedContent;