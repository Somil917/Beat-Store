"use client";

import BeatCards from "@/components/BeatCards";
import BeatItem from "@/components/BeatItem";
import LikeButton from "@/components/LikeButton";
import MediaItem from "@/components/MediaItem";
import { useLikedBeats } from "@/hooks/useLikedBeats";
import useOnPlay from "@/hooks/useOnPlay";
import { useUser } from "@/hooks/useUser";
import { Beat } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LikedContent = () => {
  const { likedBeats } = useLikedBeats();
  const onPlay = useOnPlay(likedBeats);
  const router = useRouter();
  const { isLoading, user } = useUser();

  console.log(likedBeats)

  useEffect(() => {
    if (!user && !isLoading) {
      router.replace("/");
    }
  }, [isLoading, user, router]);

  const showShimmer = () => {
    if (likedBeats.length <= 10) {
      return likedBeats.length;
    } else {
      return 10;
    }
  };

  return (
    <div>
      <div
        className="
        hidden
        md:block
        min-h-screen
        bg-[#090909]
        2xl:py-16
        py-20
        max-w-[1519px] 
        m-auto
        2xl:px-20
        md:px-10 
        lg:px-10 
        xl:px-20
        px-4
        mt-14
        "
      >
        <h1 className="2xl:text-2xl xl:text-2xl lg:2xl md:3xl text-3xl font-semibold">
          Favourites
        </h1>
        <BeatCards
          limit={showShimmer()}
          className1="2xl:grid-cols-5"
          beats={likedBeats}
        />
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
        <h1 className="2xl:text-2xl text-3xl font-semibold">Favourites</h1>
        {likedBeats.length === 0 ? (
          <div className="text-neutral-400">No Tracks Available.</div>
        ) : (
          likedBeats.map((beat) => (
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
              <LikeButton beat={beat} beatId={beat.id} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LikedContent;
