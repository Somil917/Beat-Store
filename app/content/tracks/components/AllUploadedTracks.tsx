import getDrafts from "@/actions/getDrafts";
import React from "react";
import TracksCards from "./TracksCards";

const AllUploadedTracks = async () => {
  const drafts = await getDrafts();

  return (
    <div className="scrollbar-no-arrows w-full overflow-y-auto h-full max-h-[calc(100vh-65px)] bg-[#090909] flex flex-col items-center px-5 md:px-20 pb-32 pt-16">
      <div
        className="
            grid
            max-w-[1519px] 
            mx-auto
            w-full
            grid-cols-2
            sm:grid-cols-3
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-5
            gap-5
            "
      >
        {drafts.map((item) => (
          <TracksCards track={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default AllUploadedTracks;
