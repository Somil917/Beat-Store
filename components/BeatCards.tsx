"use client";

import { Beat } from "@/types";
import BeatItem from "./BeatItem";
import { twMerge } from "tailwind-merge";
import usePlayer from "@/hooks/usePlayer";
import useOnPlay from "@/hooks/useOnPlay";

interface BeatCardsProps {
  beats: Beat[];
  className?: string;
  limit?: number;
}

const BeatCards: React.FC<BeatCardsProps> = ({ beats, className, limit }) => {
  const onPlay = useOnPlay(beats);

  if (beats.length === 0) {
    return <div className="mt-4 text-neutral-400">No songs available.</div>;
  }

  const limitedCards = beats.slice(0, limit);

  return (
    <>
      <div
        className={twMerge(
          `
            hidden
            md:grid
            grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-1
            mt-4
        `,
          className
        )}
      >
        {limitedCards.map((item) => (
          <BeatItem
            key={item.id}
            data={item}
            onClick={(id: string) => onPlay(id)}
          />
        ))}
      </div>
      <div
        className={twMerge(
          `
            md:hidden
            flex
            overflow-x-auto
            scroll-smooth
            scrollbar-hide
            -space-x-3
            mt-4
            px-1
        `,
          className
        )}
      >
        {limitedCards.map((item) => (
          <div key={item.id} className="flex-shrink-0 w-[180px]">
            <BeatItem
              key={item.id}
              data={item}
              onClick={(id: string) => onPlay(id)}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default BeatCards;
