"use client";

import Card from "@/components/Card";
import useGetUserById from "@/hooks/useGetUserById";
import useLoadAvatarImage from "@/hooks/useLoadAvatarImage";
import useLoadDraftImage from "@/hooks/useLoadDraftImage";
import { useUser } from "@/hooks/useUser";
import { Draft } from "@/types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Router } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BsThreeDots } from "react-icons/bs";

interface TracksCardsProps {
  track: Draft;
}

const TracksCards: React.FC<TracksCardsProps> = ({ track }) => {
  const { user } = useUser();
  const supabase = useSupabaseClient();
  const { userDetails } = useGetUserById(user?.id);
  const avatarImage = useLoadAvatarImage(userDetails!);
  const draftImage = useLoadDraftImage(track);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const [isCard, setIsCard] = useState<boolean>(false);
  const router = useRouter();

  const toggleCard = () => {
    setIsCard(!isCard);
  };

  useEffect(() => {
    setIsCard(false);
  }, [setIsCard]);

  const deleteDraft = async () => {
    const { error } = await supabase.from("drafts").delete().eq("id", track.id);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Draft deleted successfully");
    }
  };

  const handleEditClick = async () => {
    const { error } = await supabase
      .from("drafts")
      .update({ is_saved: false })
      .eq("id", track.id);

    if (error) {
      console.log("error edit");
    } else {
      router.replace("/content/tracks/new/files");
    }
  };

  return (
    <div className="flex border overflow-hidden border-neutral-700/50 flex-col gap-y-5 bg-[#141414] p-1 rounded-md">
      <div className="max-w-[220px] 2xl:w-[220px] xl:w-[190px] relative overflow-hidden aspect-square rounded-md">
        <Image
          fill
          className="object-cover rounded-md"
          src={
            draftImage && draftImage !== "null"
              ? draftImage
              : avatarImage || "/images/partynextdoor.jpeg"
          }
          alt="cover"
        />
      </div>
      <div className="px-2 pb-1">
        <div>
          <div className="text-sm mb-4 truncate font-medium">
            {track.metadata["title"]}
          </div>
          <p className="text-xs mt-1 text-neutral-400">
            {new Date(track.created_at).toLocaleDateString("en-GB", options)}
          </p>
          <p className="text-xs mt-1 text-neutral-400">
            {track.metadata["bpm"] || "0"} {} BPM
          </p>
        </div>
        <div className="flex gap-x-1 mb-4 items-center w-full text-xs mt-8">
          <div
            className={`md:px-3 px-2 py-1 rounded-sm ${
              !track.cover_art_url
                ? "bg-[#090909] text-neutral-400"
                : "bg-green-800/30 text-green-500"
            }`}
          >
            Cover
          </div>
          <div
            className={`md:px-3 px-2 py-1 rounded-sm ${
              !track.audio_file_url
                ? "bg-[#090909] text-neutral-400"
                : "bg-green-800/30 text-green-500"
            }`}
          >
            MP3
          </div>
          <div
            className={`md:px-3 px-2 py-1 rounded-sm ${
              !track.audio_file_url
                ? "bg-[#090909] text-neutral-400"
                : "bg-green-800/30 text-green-500"
            }`}
          >
            WAV
          </div>
        </div>
        <div className="flex w-full border-t border-neutral-700/50 py-1 pt-3 justify-between items-center">
          <input
            className="w-5 h-5 bg-transparent border-1 border-neutral-400"
            type="checkbox"
          />
          <div className="relative">
            <BsThreeDots
              onClick={toggleCard}
              className="text-neutral-300 cursor-pointer hover:text-neutral-100"
              size={20}
            />
            {isCard && (
              <Card className="absolute w-28 flex justify-start gap-1 items-start h-32 top-[-650%] right-0">
                <div className="cursor-pointer" onClick={deleteDraft}>
                  Delete
                </div>
                <div onClick={handleEditClick} className="cursor-pointer">
                  Edit
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TracksCards;
