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
    <div
      className={twMerge(
        `
            grid
            grid-cols-2
            sm:grid-cols-3
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
  );
};

export default BeatCards;
