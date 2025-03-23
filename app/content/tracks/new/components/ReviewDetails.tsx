"use client";

import { useFormContext } from "@/providers/FormProvider";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react"; // Import required styles
import NavigateRoutes from "./NavigateRoutes";
import Image from "next/image";
import { useDraftStore } from "@/hooks/useDraftStore";
import TrackDetailsUploadModal from "@/components/TrackDetailsUploadModal";
import toast from "react-hot-toast";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import useGetUserById from "@/hooks/useGetUserById";
import useProtectUploadRoute from "@/hooks/useProtectUploadRoute";

const ReviewDetails = () => {
  useProtectUploadRoute();
  const { formData } = useFormContext();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const { draftId, coverArt, audioFile } = useDraftStore();
  const supabase = useSupabaseClient();
  const { user } = useUser();
  const { userDetails } = useGetUserById(user?.id);

  const [isPublishing, setIsPublishing] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handlePublishClick = async () => {
    if (
      !userDetails?.display_name ||
      !user ||
      !draftId ||
      !coverArt ||
      !audioFile ||
      !formData.beatinfo.title ||
      !formData.beatinfo.bpm ||
      formData.beatinfo.tags.length < 3 ||
      formData.beatinfo.genres.length < 3
    ) {
      const missingFields = [];
      if (!userDetails?.display_name) missingFields.push("Display Name");
      if (!user) missingFields.push("User");
      if (!draftId) missingFields.push("Draft ID");
      if (!coverArt) missingFields.push("Cover Art");
      if (!audioFile) missingFields.push("Audio File");
      if (!formData.beatinfo.title) missingFields.push("Title");
      if (!formData.beatinfo.bpm) missingFields.push("BPM");
      if (formData.beatinfo.tags.length < 3)
        missingFields.push("Tags (minimum 3)");
      if (formData.beatinfo.genres.length < 3)
        missingFields.push("Genres (minimum 3)");

      return toast.error(
        `Please fill the required fields: ${missingFields.join(", ")}`
      );
    }

    try {
      setIsPublishing(true);

      const { data: coverBeatData, error: coverBeatError } = await supabase
        .from("drafts")
        .select("cover_art_url, audio_file_url")
        .eq("user_id", user.id)
        .eq("id", draftId)
        .single();

      if (coverBeatError) {
        return toast.error(coverBeatError.message);
      }

      const { error: supabaseError } = await supabase.from("beats").insert({
        title: formData.beatinfo.title,
        author: userDetails.display_name,
        user_id: user.id,
        bpm: formData.beatinfo.bpm,
        key: formData.beatinfo.key,
        tags: formData.beatinfo.tags,
        genres: formData.beatinfo.genres,
        image_path: coverBeatData.cover_art_url,
        beat_path: coverBeatData.audio_file_url,
      });

      if (supabaseError) {
        setIsPublishing(false);
        return toast.error(supabaseError.message);
      }

      const { data: beatId, error: beatIdError } = await supabase
        .from("beats")
        .select("id")
        .eq("title", formData.beatinfo.title)
        .eq("user_id", user.id)
        .single();

      if (beatIdError) {
        setIsPublishing(false);
        return toast.error(beatIdError.message);
      }

      if (!beatId) {
        setIsPublishing(false);
        return toast.error("Failed to fetch beatId");
      }

      const activeLicenses = formData.pricing.filter(
        (license) => license.isApplied
      );

      const licensesWithBeatId = activeLicenses.map((license) => ({
        license_type: license.license_type,
        price: license.price,
        policies: license.policies,
        beat_id: beatId.id,
      }));

      const { error: licenseInsertError } = await supabase
        .from("licenses")
        .insert(licensesWithBeatId);

      if (licenseInsertError) {
        setIsPublishing(false);
        return toast.error(licenseInsertError.message);
      }

      const { error: draftUpdateError } = await supabase
        .from("drafts")
        .update({
          metadata: formData.beatinfo,
          is_published: true,
          is_saved: true,
        })
        .eq("user_id", user.id)
        .eq("id", draftId)
        .single();

      if (draftUpdateError) {
        return toast.error(draftUpdateError.message);
      }

      router.refresh();
      setIsPublishing(false);
      toast.success("Published Successfully");
      router.replace("/content/tracks/uploaded");
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className=" bg-[#141414] max-w-[1519px] mx-auto px-8 py-5 2xl:w-[50%] xl:w-[55%] lg:w-[60%] md:w-[80%] w-[90%] rounded-md border border-neutral-700/50">
      <div className="flex w-full flex-col gap-y-2 h-full">
        <NavigateRoutes />
        <h2 className="text-xl font-bold text-white mb-2 mt-4">Beat Info</h2>
        <div className="flex gap-6">
          <div className="overflow-hidden flex justify-center items-center relative border border-neutral-700/50 h-[150px] w-[150px] md:h-[200px] md:w-[200px] bg-neutral-700 rounded-md">
            {coverArt ? (
              <Image
                src={coverArt}
                fill
                className="object-cover"
                sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
                alt="cover-art"
              />
            ) : (
              <Image
                src="/images/partynextdoor.jpeg"
                fill
                sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
                alt="cover-art"
              />
            )}
          </div>
          <TrackDetailsUploadModal />
          <div>
            <div className="leading-8">
              Title: {isMounted ? formData.beatinfo?.title || "N/A" : " "}{" "}
              <br />
              Key: {isMounted ? formData.beatinfo?.key || "N/A" : " "} <br />
              BPM: {isMounted ? formData.beatinfo?.bpm || "N/A" : " "} <br />
              Description:{" "}
              {isMounted ? formData.beatinfo?.description || "N/A" : " "} <br />
              Tags:{" "}
              {isMounted
                ? formData.beatinfo?.tags?.join(", ") || "N/A"
                : " "}{" "}
              <br />
              Genre:{" "}
              {isMounted
                ? formData.beatinfo?.genres?.join(", ") || "N/A"
                : " "}{" "}
              <br />
            </div>
          </div>
        </div>
        <div className="flex justify-end my-2 pt-6 border-t border-neutral-700/50 ">
          <button
            onClick={() => {
              router.replace("licenses");
            }}
            className="px-4 py-1 hover:bg-neutral-700 active:outline active:outline-[6px] active:outline-neutral-800 rounded-md mr-4 border border-neutral-700/50 bg-neutral-800"
          >
            Back
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              handlePublishClick();
            }}
            className="px-4 hover:bg-blue-700 active:outline active:outline-[6px] active:outline-blue-800 active:bg-blue-500 active:text-black py-1 rounded-md border border-neutral-700/50 bg-blue-800 text-white"
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewDetails;
