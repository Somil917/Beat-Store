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
import { useCallback, useEffect, useState } from "react";
import useSound from "use-sound";
import { twMerge } from "tailwind-merge";

interface PlayerContentProps {
  beat: Beat;
  beatUrl: string;
  className?: string;
}

const PlayerContent: React.FC<PlayerContentProps> = ({
  beat,
  beatUrl,
  className,
}) => {
  const { isPlaying, setPlayingState, togglePlay, ids, activeId, setId } =
    usePlayer();
  const [volume, setVolume] = useState(1);
  // const [isPlaying, setIsPlaying] = useState(false);
  const [beatDuration, setBeatDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = volume === 0 ? BsVolumeMute : BsVolumeUp;

  const onPlayNext = () => {
    if (ids.length === 0) {
      return;
    }

    const currentIndex = ids.findIndex((id) => id === activeId);
    const nextBeat = ids[currentIndex + 1];

    if (!nextBeat) {
      return setId(ids[0]);
    }

    setId(nextBeat);
  };

  const onPlayPrevious = () => {
    if (ids.length === 0) {
      return;
    }

    const currentIndex = ids.findIndex((id) => id === activeId);
    const previousBeat = ids[currentIndex - 1];

    if (!previousBeat) {
      return setId(ids[ids.length - 1]);
    }

    setId(previousBeat);
  };

  const [play, { pause, sound }] = useSound(beatUrl, {
    volume: volume,
    onend: () => {
      // setIsPlaying(false);
      // setPlayingState(!isPlaying);
      if (ids.length <= 1) {
        setPlayingState(!isPlaying);
        console.log(ids);
      } else {
        onPlayNext();
      }
    },
    format: ["mp3"],
  });

  useEffect(() => {
    if (sound) {
      const interval = setInterval(() => {
        const duration = sound.duration();
        if (duration) {
          setBeatDuration(duration * 1000);
          clearInterval(interval);
        }
      }, 100);

      return () => clearInterval(interval);
    }
  }, [sound]);

  useEffect(() => {
    if (!sound) return;

    let animationFrame: number;

    const updateSeekbar = () => {
      if (sound.playing()) {
        const seekTime = sound.seek() * 1000; // Get current time in milliseconds
        setCurrentTime(seekTime); // Update the state
      }
      animationFrame = requestAnimationFrame(updateSeekbar);
    };

    if (isPlaying) {
      animationFrame = requestAnimationFrame(updateSeekbar);
    }

    return () => {
      cancelAnimationFrame(animationFrame);
      sound.unload();
    };
  }, [sound]);

  useEffect(() => {
    if (!sound) return;
    if (sound) {
      if (isPlaying) {
        play();
      } else {
        pause();
      }
    }

    return () => {
      sound.pause();
    };
  }, [sound, isPlaying, play, pause]);

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
    setCurrentTime(time);
    sound?.seek(time / 1000);

    setTimeout(() => {
      setCurrentTime(sound?.seek() * 1000 || 0); // Ensure UI and audio position are in sync
    }, 50);
  };

  // Calculate the percentage of progress based on currentTime and duration
  const progressPercentage = beatDuration
    ? (currentTime / beatDuration) * 100
    : 0;

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div
      className={twMerge(
        `"
            grid
            grid-cols-[80%_20%]
            md:grid-cols-3
            h-full
            realative
        "`,
        className
      )}
    >
      <div
        className="
      absolute
      top-0
      group
      left-0
      w-full
      flex
      justify-center
      items-center
      md:px-20
      px-4
      "
      >
        <div
          className="mx-20 md:block hidden transform transition opacity-0 group-hover:opacity-100 -translate-y-full text-xs bg-neutral-800 text-white px-[3px] py-[2px] rounded shadow-lg"
          style={{
            left: `calc(${progressPercentage}% - 7px)`, // Offset the label to align with the thumb
            top: "-13px", // Position above the slider
            position: "absolute",
          }}
        >
          {formatTime(currentTime)}
        </div>
        <input
          className="trackSeekbar relative cursor-pointer w-full h-[2px] appearance-none hover:bg-neutral-700 "
          type="range"
          min="0"
          max={beatDuration || 180000} //default to 0 if duration is 0 or not retrieved
          value={currentTime}
          onChange={handleSeek}
          style={
            {
              "--progress": `${progressPercentage}%`, // Update the progress dynamically
            } as React.CSSProperties
          }
        />
      </div>
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
                    gap-2
                "
        >
          <MediaItem className="p-0" data={beat} />
          <LikeButton beat={beat} beatId={beat.id} />
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
          onClick={(e) => {
            setPlayingState(!isPlaying);
          }}
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
          onClick={(e) => {
            setPlayingState(!isPlaying);
          }}
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
      <div className="hidden md:flex w-full justify-end pr-2">
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
