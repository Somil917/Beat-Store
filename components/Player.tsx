"use client";

import useGetSongById from "@/hooks/useGetSongById";
import useLoadBeatUrl from "@/hooks/useLoadBeatUrl";
import usePlayer from "@/hooks/usePlayer";
import PlayerContent from "./PlayerContent";

export const revalidate = 0;

const Player = () => {

    const player = usePlayer();
    const { beat } = useGetSongById(player.activeId); 

    const beatUrl = useLoadBeatUrl(beat!);

    if(!beat || !player.activeId || !beatUrl){
        return null
    }

    return ( 
        <div className="
        w-full
        flex
        justify-center
        align-center
        border-t
        border-neutral-700/50
        bg-[#141414]
        fixed
        bottom-0
        left-0
        ">
        <div 
        className="
            bg-[#141414]
            w-[90%]
            py-2
            h-[80px]
            px-4
        "
        >
            <PlayerContent 
                key={beatUrl}
                beat={beat}
                beatUrl={beatUrl}
            />
        </div>
        </div>
     );
}
 
export default Player;