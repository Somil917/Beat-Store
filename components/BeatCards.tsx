"use client";

import { Beat } from "@/types";
import BeatItem from "./BeatItem";
import { twMerge } from "tailwind-merge";
import usePlayer from "@/hooks/usePlayer";
import useOnPlay from "@/hooks/useOnPlay";
import { useEffect, useState } from "react";
import useGetPurchasedBeats from "@/hooks/useGetPurchasedBeats";
import { useUser } from "@/hooks/useUser";

interface BeatCardsProps {
  beats: Beat[];
  className1?: string;
  className2?: string;
  limit?: number;
}

const BeatCards: React.FC<BeatCardsProps> = ({
  beats,
  className1,
  className2,
  limit,
}) => {
  const { user } = useUser();
  const { purchasedBeatsDetails } = useGetPurchasedBeats(user?.id);

  const onPlay = useOnPlay(beats);

  const [loading, setLoading] = useState(true);
  const [fetchedBeats, setFetchedBeats] = useState<Beat[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setFetchedBeats(beats);
      setLoading(false);
    }, 1000);
  }, [beats]);

  if (beats.length === 0) {
    return <div className="mt-4 text-neutral-400">No songs available.</div>;
  }

  const renderShimmer = () => (
    <div className="flex p-[16px] justify-center transition">
      <div className="w-[189px] rounded-md">
        <div className="w-full rounded-md shimmer bg-neutral-800 h-[189px]"></div>
        <div className="h-[68px] mt-3 flex flex-col gap-2">
          <div className="w-1/2 h-[20px] rounded-md shimmer bg-neutral-800"></div>
          <div className="w-full h-[20px] flex gap-2">
            <div className="w-1/3 rounded-md shimmer bg-neutral-800 h-full"></div>
            <div className="w-1/3 rounded-md shimmer bg-neutral-800 h-full"></div>
          </div>
        </div>
      </div>
    </div>
  );

  const limitedCards = fetchedBeats.slice(0, limit);

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
          className1
        )}
      >
        {loading
          ? Array.from({ length: limit || 6 }).map((_, index) => (
              <div key={index}>{renderShimmer()}</div>
            ))
          : limitedCards.map((item) => (
              <BeatItem
                purchasedBeatsDetails={purchasedBeatsDetails}
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
            -space-x-1
            mt-4
            px-3
        `,
          className2
        )}
      >
        {loading
          ? Array.from({ length: limit || 6 }).map((_, index) => (
              <div key={index}>{renderShimmer()}</div>
            ))
          : limitedCards.map((item) => (
              <div key={item.id} className="flex-shrink-0 w-[180px]">
                <BeatItem
                  purchasedBeatsDetails={purchasedBeatsDetails}
                  className="p-3"
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
