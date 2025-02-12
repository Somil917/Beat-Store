"use client";

import BeatCards from "@/components/BeatCards";
import BeatItem from "@/components/BeatItem";
import LikeButton from "@/components/LikeButton";
import MediaItem from "@/components/MediaItem";
import useOnPlay from "@/hooks/useOnPlay";
import { useUser } from "@/hooks/useUser";
import { Beat } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface LikedContentProps {
  beats: Beat[];
}

const LikedContent: React.FC<LikedContentProps> = ({ beats }) => {
  const onPlay = useOnPlay(beats);
  const router = useRouter();
  const { isLoading, user } = useUser();

  useEffect(() => {
    if (!user && !isLoading) {
      router.replace("/");
    }
  }, [isLoading, user, router]);

  const showShimmer = () => {
    if(beats.length <= 10){
      return beats.length;
    }else{
      return 10;
    }
  }

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
        2xl:px-28
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
        <BeatCards limit={showShimmer()} className1="2xl:grid-cols-5" beats={beats} />
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

export default LikedContent;
