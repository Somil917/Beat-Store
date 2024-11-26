"use client";

import useLoadImage from "@/hooks/useLoadImage";
import { Beat } from "@/types";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

interface MediaItemProps {
  data: Beat;
  onClick?: (id: string) => void;
  className?: string;
}

const MediaItem: React.FC<MediaItemProps> = ({ data, onClick, className }) => {
  const imageUrl = useLoadImage(data);

  const handleClick = () => {
    if (onClick) {
      return onClick(data.id);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={twMerge(
        `
            flex
            items-center
            gap-x-5
            w-full
            rounded-md
            p-2
            overflow-hidden
            `,
        className
      )}
    >
      <div
        className="
            relative
            rounded-md
            aspect-square
            w-[40px]
            h-[40px]
            min-w-[48px]
            min-h-[48px]
            overflow-hidden
            md:border-none
            border
            border-neutral-700
            "
      >
        <Image
          className="object-cover select-none"
          fill
          src={imageUrl || "../public/images/partynextdoor.jpeg"}
          alt={data.title}
        />
      </div>
      <div className="flex relative flex-col gap-y-0 overflow-hidden pr-3  w-full text-white">
        <p className="font-bold text-md select-none w-full truncate">
          {data.title}
        </p>
        <p className="text-sm text-neutral-400 select-none w-full truncate">
          {data.author}
        </p>
      </div>
    </div>
  );
};

export default MediaItem;
