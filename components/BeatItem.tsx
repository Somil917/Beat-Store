"use client";

import useLoadImage from "@/hooks/useLoadImage";
import { Beat } from "@/types";
import Image from "next/image";
import { FaPlay, FaRegPlayCircle } from "react-icons/fa";
import PlayBtn from "./PlayBtn";
import LikeButton from "./LikeButton";
import useOnPlay from "@/hooks/useOnPlay";
import { BsPauseBtn } from "react-icons/bs";

interface BeatItemProps {
  data: Beat;
  onClick: (id: string) => void;
}

const BeatItem: React.FC<BeatItemProps> = ({ data, onClick }) => {
  const imagePath = useLoadImage(data);

  return (
    <div
      className="
                relative
                group
                flex
                flex-col
                items-center
                justify-center
                rounded-md
                overflow-hidden
                gap-x-4
                cursor-pointer
                hover:bg-neutral-400/10
                transition
                p-4
            "
    >
      <div
        className="
                relative
                group
                aspect-square
                w-full
                h-full
                rounded-md
                transition
                overflow-hidden
                border
                border-neutral-700
            "
      >
        <Image
          className="object-cover"
          fill
          src={imagePath || "../public/images/next.svg"}
          alt={data.title}
        />
        <div
          className="
                absolute
                top-2
                right-2
                bg-neutral-900/40
                md:bg-transparent
                md:group-hover:bg-neutral-900/30
                transition
                p-2
                rounded-full
                flex
                justify-center
                items-center
                "
        >
          <LikeButton
            className="md:opacity-0 transition w-full opacity-100 md:group-hover:opacity-100"
            beatId={data.id}
          />
        </div>
        <div
          onClick={() => onClick(data.id)}
          className="
                    absolute
                    top-1/2 
                    left-1/2
                "
        >
          <PlayBtn />
        </div>
      </div>
      <div className="flex flex-col pt-4 w-full gap-y-1">
        <p className="truncate font-semibold w-full">{data.title}</p>
        <div className="flex items-center justify-between w-full ">
          <p className="text-neutral-400 text-sm pb-1 w-full truncate pr-1">
            By {data.author}
          </p>
          <div className="w-full flex justify-between items-center">
            <p className="text-blue-600 text-sm pb-1 bg-">{data.bpm} BPM</p>
            <p className="text-neutral-400 hidden md:block text-sm pb-1 bg-">{data.key}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeatItem;
