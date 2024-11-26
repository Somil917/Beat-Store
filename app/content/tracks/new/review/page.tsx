import React from "react";
import ReviewDetails from "../components/ReviewDetails";
import CancelTrack from "../components/CancelTrack";
import SaveDiscardDraftModal from "@/components/SaveDiscardDraftModal";

const Review = () => {
  return (
    <div className="absolute w-full top-[65px] h-[calc(100vh-65px)] flex flex-col">
      <SaveDiscardDraftModal />
      <CancelTrack/>
      <div className="scrollbar-no-arrows w-full overflow-y-auto h-full max-h-[calc(100vh-65px)] bg-[#090909] flex flex-col items-center pb-32 pt-16">
        <div className="text-xl mb-4 text-start 2xl:w-[50%] xl:w-[55%] lg:w-[60%] md:w-[80%] w-[90%]">
          Review<span className="text-lg text-neutral-400"> - Step 3 of 3</span>
        </div>
        <ReviewDetails />
      </div>
    </div>
  );
};

export default Review;
