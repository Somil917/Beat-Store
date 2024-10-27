"use client";

import Input from "@/components/Input";
import { useFormContext } from "@/providers/FormProvider";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ChangeEvent } from "react";
import NavigateRoutes from "./NavigateRoutes";

const UploadBeat = () => {
  const { formData, updateFormData } = useFormContext();
  const router = useRouter();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]; // Get the first file
      const { name } = e.target; // Get the name of the input field (mp3-file or wav-file)

      if (name === "mp3-file") {
        updateFormData("files", { ...formData.files, mp3: file });
      } else if (name === "wav-file") {
        updateFormData("files", { ...formData.files, wav: file });
      } else if (name === "zip-file") {
        updateFormData("files", { ...formData.files, zip: file });
      }
    }
  };

  return (
    <div className=" bg-[#141414] px-8 py-5 w-[50%] rounded-md border border-neutral-700/50">
      <div className="flex flex-col gap-y-6  h-full">
        <NavigateRoutes />
        <form className="flex flex-col gap-y-10">
          <div>
            <div className="text-sm text-neutral-500 mb-2">
              AUDIO FILES FOR DOWNLOAD
            </div>
            <div className="text-xl mb-2 font-semibold ">Upload WAV/MP3</div>
            <div className="text-[13px] mb-4">
              We will convert the WAV file into an (un-tagged & tagged) MP3 file
              for streaming and purchasing purposes.
            </div>
            <Input
              type="file"
              accept=".mp3"
              id="mp3-file"
              name="mp3-file"
              onChange={handleFileChange}
            />
          </div>
          <div>
            <div className="text-xl mb-2 font-semibold ">
              Upload Stems (Optional)
            </div>
            <div className="text-[13px] mb-4">
              Add a ZIP or RAR file containing your track stems, to provide
              additional licensing options for your clients. Your active
              licenses that include stem files, will automatically be enabled.
            </div>
            <Input
              type="file"
              accept=".zip"
              id="zip-file"
              name="zip-file"
              onChange={handleFileChange}
            />
          </div>
          <div>
            <div className="text-sm text-neutral-500 mb-2">
              AUDIO FILES FOR STREAMING
            </div>
            <div className="text-xl mb-4 font-semibold ">Tagged file</div>
            <Input
              type="file"
              accept=".wav"
              id="wav-file"
              name="wav-file"
              onChange={handleFileChange}
            />
          </div>
        </form>
        <div className="flex justify-end mt-2">
          <button
            onClick={() => {
              router.push("info");
            }}
            className="px-4 border border-neutral-700/50 py-1 rounded-md bg-neutral-800"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadBeat;