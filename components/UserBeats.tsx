"use client"

import { Beat } from "@/types";
import React, { useEffect, useState } from "react";
import BeatCards from "./BeatCards";

interface UserBeatsProps {
  beats: Beat[];
}

const UserBeats: React.FC<UserBeatsProps> = ({ beats }) => {
  const [shimmerLoading, setShimmerLoading] = useState(true);

  const showShimmer = () => {
    if (beats.length <= 8) {
      return beats.length;
    } else {
      return 10;
    }
  };


  useEffect(() => {
    setTimeout(() => {
      setShimmerLoading(false);
    }, 1000);
  });

  return (
    <>
      <div className=" min-h-[440px] md:w-[73%] w-full p-4 md:bg-[#141414] rounded-md">
        <div className="py-4 md:p-4 text-lg font-bold">{shimmerLoading ? (
          <div className="w-[200px] h-[30px] shimmer rounded-md "></div>
        ) : "Your Tracks"}</div>
        <BeatCards
          limit={showShimmer()}
          className1="mt-0 grid 2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3"
          className2="hidden"
          beats={beats}
        />
      </div>
    </>
  );
};

export default UserBeats;
