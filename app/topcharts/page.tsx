import getBeats from "@/actions/getBeats";
import BeatCards from "@/components/BeatCards";
import Beatssection from "@/components/Beatssection";
import Navbar from "@/components/Navbar";
import React, { Suspense } from "react";

const TopCharts = async () => {
  const beats = await getBeats(15);

  const showShimmer = () => {
    if (beats.length <= 10) {
      return beats.length;
    } else {
      return 10;
    }
  };

  return (
    <>
      {/* <Navbar/> */}
      <div
        className="
        min-h-screen
        bg-[#090909]
        max-w-[1519px] 
        m-auto
        2xl:py-16
        py-20
        px-5
        2xl:px-20
        md:px-10 
        lg:px-10 
        xl:px-20
        mt-14"
      >
        <h1 className="2xl:text-2xl mb-6 -m-1 md:m-0 text-3xl font-semibold">
          Trending Tracks
        </h1>
        <Suspense fallback={<div>loading</div>}>
          <BeatCards
            limit={showShimmer()}
            className1="2xl:grid-cols-5 grid"
            className2="hidden"
            beats={beats}
          />
        </Suspense>
      </div>
    </>
  );
};

export default TopCharts;
