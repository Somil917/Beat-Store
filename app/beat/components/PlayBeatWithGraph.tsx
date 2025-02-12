import useLoadImage from "@/hooks/useLoadImage";
import useOnPlay from "@/hooks/useOnPlay";
import usePlayer from "@/hooks/usePlayer";
import { Beat } from "@/types";
import Image from "next/image";
import React, { useState } from "react";
import { IoIosPlay, IoMdPause } from "react-icons/io";

interface PlayBeatWithGraphProps {
  beat: Beat;
}

const PlayBeatWithGraph: React.FC<PlayBeatWithGraphProps> = ({ beat }) => {
  const beatCover = useLoadImage(beat);

  const {isPlaying, togglePlay, setId, activeId, setPlayingState} = usePlayer();
  const handlePlay = () => {
    if(activeId === beat.id){
      setPlayingState(!isPlaying)
    }else{
      setId(beat.id)
      setPlayingState(true)
    }
  }

  return (
    <div className="flex relative p-3 border border-neutral-600 rounded-full overflow-hidden">
      <Image src={beatCover!} fill className="absolute inset-0 blur-2xl" alt="overlay"/>
      <button
        onClick={(e) => {
          e.preventDefault();
          handlePlay()
        }}
        className={`align-middle z-10 flex justify-center items-center p-4 font-medium rounded-full
            text-white hover:bg-blue-500 active:outline active:outline-[6px] active:outline-blue-800/40 active:bg-blue-700 active:text-black bg-blue-600  cursor-pointer
        } `}
      >
        {isPlaying && activeId === beat?.id ? (
          <span className="flex w-full justify-center items-center align-middle gap-[1px]">
            <IoMdPause size={30} />
          </span>
        ) : (
          <span className="flex w-full justify-center items-center align-middle gap-[1px]">
            <IoIosPlay size={30} />
          </span>
        )}
      </button>
    </div>
  );
};

export default PlayBeatWithGraph;
