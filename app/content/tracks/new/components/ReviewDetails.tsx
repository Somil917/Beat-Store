"use client";

import { useFormContext } from "@/providers/FormProvider";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react"; // Import required styles
import NavigateRoutes from "./NavigateRoutes";
import Image from "next/image";

const ReviewDetails = () => {
  const { formData } = useFormContext();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className=" bg-[#141414] px-8 py-5 w-[50%] rounded-md border border-neutral-700/50">
      <div className="flex w-full flex-col gap-y-6 h-full">
        <NavigateRoutes />
        <div className="flex flex-col gap-6">
          <div>
            <Image
              src="/images/partynextdoor.jpeg"
              width={150}
              height={150}
              alt="cover-art"
            />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white mb-4">Beat Info</h2>
            <div className="leading-8">
              Title: {isMounted ? formData.beatinfo.title : " "} <br />
              Key: {isMounted ? formData.beatinfo.key : " "} <br />
              BPM: {isMounted ? formData.beatinfo.bpm : " "} <br />
              Description: {isMounted
                ? formData.beatinfo.description
                : " "}{" "}
              <br />
              Tags: {isMounted ? formData.beatinfo.tags + " " : " "} <br />
              Genre: {isMounted ? formData.beatinfo.genres + " " : " "} <br />
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-2 ">
          <button
            onClick={() => {
              router.replace("info");
            }}
            className="px-4 py-1 rounded-md mr-4 border border-neutral-700/50 bg-neutral-800"
          >
            Back
          </button>
          <button className="px-4 py-1 rounded-md border border-neutral-700/50 bg-blue-800 text-white">
            Publish
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewDetails;
