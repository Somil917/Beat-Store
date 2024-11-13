"use client";

import { useFormContext } from "@/providers/FormProvider";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react"; // Import required styles
import NavigateRoutes from "./NavigateRoutes";
import Image from "next/image";
import { useDraftStore } from "@/hooks/useDraftStore";
import TrackDetailsUploadModal from "@/components/TrackDetailsUploadModal";

const ReviewDetails = () => {
  const { formData } = useFormContext();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const { coverArt } = useDraftStore();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className=" bg-[#141414] px-8 py-5 w-[50%] rounded-md border border-neutral-700/50">
      <div className="flex w-full flex-col gap-y-2 h-full">
        <NavigateRoutes />
        <h2 className="text-xl font-bold text-white mb-2 mt-4">Beat Info</h2>
        <div className="flex gap-6">
          <div className="overflow-hidden flex justify-center items-center relative border border-neutral-700/50 h-[200px] w-[200px] bg-neutral-700 rounded-md">
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
              router.replace("info");
            }}
            className="px-4 py-1 hover:bg-neutral-700 active:outline active:outline-[6px] active:outline-neutral-800 rounded-md mr-4 border border-neutral-700/50 bg-neutral-800"
          >
            Back
          </button>
          <button className="px-4 hover:bg-blue-700 active:outline active:outline-[6px] active:outline-blue-800 active:bg-blue-500 active:text-black py-1 rounded-md border border-neutral-700/50 bg-blue-800 text-white">
            Publish
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewDetails;
