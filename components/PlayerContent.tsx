"use client";

import { Beat } from "@/types";
import MediaItem from "./MediaItem";
import LikeButton from "./LikeButton";
import {
  BsPauseFill,
  BsPlayFill,
  BsVolumeMute,
  BsVolumeMuteFill,
  BsVolumeUp,
  BsVolumeUpFill,
} from "react-icons/bs";
import { AiFillStepBackward } from "react-icons/ai";
import { MdSkipPrevious } from "react-icons/md";
import { IoMdSkipBackward, IoMdSkipForward } from "react-icons/io";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import Slider from "./Slider";
import usePlayer from "@/hooks/usePlayer";
import { useEffect, useState } from "react";
import useSound from "use-sound";
import { twMerge } from "tailwind-merge";

interface PlayerContentProps {
  beat: Beat;
  beatUrl: string;
  className?: string;
}

const PlayerContent: React.FC<PlayerContentProps> = ({ beat, beatUrl, className }) => {
  const player = usePlayer();
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [beatDuration, setBeatDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = volume === 0 ? BsVolumeMute : BsVolumeUp;

  const onPlayNext = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const nextBeat = player.ids[currentIndex + 1];

    if (!nextBeat) {
      return player.setId(player.ids[0]);
    }

    player.setId(nextBeat);
  };

  const onPlayPrevious = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const previousBeat = player.ids[currentIndex - 1];

    if (!previousBeat) {
      return player.setId(player.ids[player.ids.length - 1]);
    }

    player.setId(previousBeat);
  };

  const [play, { pause, sound }] = useSound(beatUrl, {
    volume: volume,
    onload: () => {
      if(sound){
        console.log('song loaded', sound)
        setBeatDuration(sound.duration() * 1000);
      }
    },
    onplay: () => setIsPlaying(true),
    onend: () => {
      setIsPlaying(false);
      onPlayNext();
    },
    onpause: () => setIsPlaying(false),
    format: ["mp3"],
  });

  useEffect(() => {
    if(!sound) return;
    sound?.play();  

    const interval = setInterval(() => {
      if(sound && sound.playing()){
        setCurrentTime(sound.seek() * 1000);
      }
    }, 1000);

    return () => {
      sound?.unload();
      clearInterval(interval);
    };
  }, [sound]);

  const handlePlay = () => {
    if (!isPlaying) {
      play();
    } else {
      pause();
    }
  };

  const toggleMute = () => {
    if (volume === 0) {
      setVolume(1);
    } else {
      setVolume(0);
    }
  };

  // handle seekbar
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseInt(e.target.value, 10);
    console.log(time)
    setCurrentTime(time)
    sound?.seek(time / 1000); 

    // setTimeout(() => {
    //   setCurrentTime(sound?.seek() * 1000 || 0); // Ensure UI and audio position are in sync
    // }, 50);
  }

  return (
    <div
      className={twMerge(`"
            grid
            grid-cols-[80%_20%]
            md:grid-cols-3
            h-full
            realative
        "`, className)}
    >
      {/* <div className="
      absolute
      top-0
      left-0
      w-full
      flex
      justify-center
      items-center
      ">
        <input 
          type="range"
          min="0"
          max={beatDuration}
          value={currentTime}
          onChange={handleSeek}
        />
        <div>{beatDuration} / {currentTime}</div>
      </div> */}
      <div
        className="
                flex
                md:w-full
                w-full
                justify-start
            "
      >
        <div
          className="
                    flex
                    items-center
                    w-full
                "
        >
          <MediaItem data={beat} />
          <LikeButton beatId={beat.id} />
        </div>
      </div>
      <div
        className="
                flex
                md:hidden
                col-auto
                w-full
                justify-end
                items-center
            "
      >
        <div
          onClick={handlePlay}
          className="
                    h-10
                    w-10
                    flex
                    items-center
                    justify-center
                    bg-black
                    border-white
                    border-[3px]
                    rounded-full
                    cursor-pointer
                "
        >
          <Icon size={30} className="text-white " />
        </div>
      </div>

      <div
        className="
                hidden
                h-full
                md:flex
                justify-center
                items-center
                w-full
                max-w-[722px]
                gap-x-6
            "
      >
        <IoMdSkipBackward
          onClick={onPlayPrevious}
          size={17}
          className="
                        text-neutral-400
                        cursor-pointer
                        hover:text-white
                        transition
                    "
        />
        <div
          onClick={handlePlay}
          className="
                    h-10
                    w-10
                    flex
                    items-center
                    justify-center
                    bg-black
                    border-white
                    border-[3px]
                    rounded-full
                    p-1
                    cursor-pointer
                "
        >
          <Icon size={30} className="text-white" />
        </div>
        <IoMdSkipForward
          onClick={onPlayNext}
          size={17}
          className="
                        text-neutral-400
                        cursor-pointer
                        hover:text-white
                        transition
                    "
        />
      </div>
      <div className="hidded md:flex w-full justify-end pr-2">
        <div className="flex items-center gap-x-2 w-[120px]">
          <VolumeIcon
            onClick={toggleMute}
            className="cursor-pointer"
            size={29}
          />
          <Slider value={volume} onChange={(value) => setVolume(value)} />
        </div>
      </div>
    </div>
  );
};

export default PlayerContent;
