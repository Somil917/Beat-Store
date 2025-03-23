"use client";

import BeatCards from "@/components/BeatCards";
import LikeButton from "@/components/LikeButton";
import MediaItem from "@/components/MediaItem";
import useOnPlay from "@/hooks/useOnPlay";
import { Beat } from "@/types";

interface SearchContentProps {
  beats: Beat[];
}

const SearchContent: React.FC<SearchContentProps> = ({ beats }) => {
  const onPlay = useOnPlay(beats);

  return (
    <div>
      <div
        className="
        hidden
        md:block
        min-h-screen
        bg-[#090909]
        max-w-[1519px] 
        m-auto
        2xl:py-16
        py-20
        2xl:px-20
        md:px-10 
        lg:px-10 
        xl:px-20
        px-4
        mt-14
        "
      >
        <h1 className="2xl:text-2xl xl:text-2xl lg:2xl md:3xl text-3xl font-semibold">
          Tracks
        </h1>
        <BeatCards className1="2xl:grid-cols-5" beats={beats} />
      </div>
      <div
        className="
        md:hidden
        flex
        flex-col
        w-full
        bg-[#090909]
        gap-y-6 
        min-h-screen
        mt-16
        px-5
        py-20
        "
      >
        <h1 className="2xl:text-2xl text-3xl font-semibold">Tracks</h1>
        {beats.length === 0 ? (
          <div className="text-neutral-400">No Tracks Available.</div>
        ) : (
          beats.map((beat) => (
            <div
              className="
              flex
              items-center
              justify-between
              w-full
              gap-x-4
              "
              key={beat.id}
            >
              <MediaItem
                data={beat}
                className="p-0"
                onClick={(id: string) => onPlay(id)}
              />
              <LikeButton beatId={beat.id} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchContent;
