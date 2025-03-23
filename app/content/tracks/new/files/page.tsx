"use client"

import React from "react";
import UploadBeat from "../components/UploadBeat";
import BeatInfo from "../components/BeatInfo";
import NavigateRoutes from "../components/NavigateRoutes";
import CancelTrack from "../components/CancelTrack";
import SaveDiscardDraftModal from "@/components/SaveDiscardDraftModal";
import useProtectRoutes from "@/hooks/useProtectUploadRoute";

const uploadFiles = () => {


  return (
    <div className="absolute w-full top-[65px] h-[calc(100vh-65px)] flex flex-col">
      <SaveDiscardDraftModal />
      <CancelTrack/>
      <div className="scrollbar-no-arrows w-full overflow-y-auto bg-[#090909] h-full max-h-[calc(100vh-65px)] flex flex-col items-center pb-32 pt-16">
        <div className="text-xl max-w-[1519px] mx-auto mb-4 text-start 2xl:w-[50%] xl:w-[55%] lg:w-[60%] md:w-[80%] w-[90%]">Files<span className="text-lg text-neutral-400"> - Step 1 of 4</span></div>
        <UploadBeat />
      </div>
    </div>
  );
};

export default uploadFiles;
