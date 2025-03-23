import { Beat } from "@/types";
import MediaItem from "./MediaItem";
import LikeButton from "./LikeButton";
import { useRouter } from "next/navigation";
import React from "react";
import Link from "next/link";
import { useLikedBeats } from "@/hooks/useLikedBeats";

const LikeCardItems = () => {
  const { likedBeats } = useLikedBeats();

  return (
    <>
      {likedBeats.length > 0 ? (
        <>
          <ul
            className="
            flex
            flex-col
            w-full
            "
          >
            {likedBeats.slice(0, 4).map((beat) => (
              <li
                className="flex justify-between items-center w-full pr-2 "
                key={beat.id}
              >
                <MediaItem data={beat} />
                <LikeButton beat={beat} beatId={beat.id} />
              </li>
            ))}
          </ul>
          <Link
            href="/liked"
            className="relative text-center hover:bg-neutral-400/10 py-2 rounded-md"
          >
            <span className="absolute left-0 right-0 top-0 h-[0.2px] bg-neutral-800 -translate-y-2"></span>
            See more
          </Link>
        </>
      ) : (
        <p className="text-neutral-400 text-base m-auto">No favourites</p>
      )}
    </>
  );
};

export default LikeCardItems;
