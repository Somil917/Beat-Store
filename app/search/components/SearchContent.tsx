"use client";

import LikeButton from "@/components/LikeButton";
import MediaItem from "@/components/MediaItem";
import useOnPlay from "@/hooks/useOnPlay";
import { Beat } from "@/types";

interface SearchContentProps {
  beats: Beat[];
}

const SearchContent: React.FC<SearchContentProps> = ({ beats }) => {
  const onPlay = useOnPlay(beats);

  if (beats.length === 0) {
    return (
      <div
        className="
        flex
        justify-center
        gap-y-2
        w-full
        px-6
        text-neutral-400
        "
      >
        No results found.
      </div>
    );
  }

  return (
    <div className="flex 
        mt-14 flex-col items-center w-full min-h-screen gap-y-2 px-40 py-11">
      {beats.map((beat) => (
        <div key={beat.id} className="flex items-center pr-4 justify-between rounded-md bg-neutral-800/50 gap-x-4 w-full">
          <MediaItem data={beat} onClick={(id: string) => onPlay(id)} />
          <LikeButton beatId={beat.id}/>
        </div>
      ))}
    </div>
  );
};

export default SearchContent;
