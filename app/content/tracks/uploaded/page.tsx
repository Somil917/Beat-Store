import React from "react";
import AllUploadedTracks from "../components/AllUploadedTracks";
import CancelTrack from "../new/components/CancelTrack";

const UploadedTracks = () => {
  return (
    <div className="absolute w-full top-[65px] h-[calc(100vh-65px)] flex flex-col">
      <CancelTrack/>
      <AllUploadedTracks />
    </div>
  );
};

export default UploadedTracks;
