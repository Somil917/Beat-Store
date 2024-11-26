import { Beat } from "@/types";
import React from "react";
import BeatCards from "./BeatCards";

interface UserBeatsProps {
  beats: Beat[];
}

const UserBeats: React.FC<UserBeatsProps> = ({ beats }) => {
  return (
    <>
      <div className=" min-h-[440px] md:w-[900px] w-full p-4 md:bg-[#141414] rounded-md">
        <div className="py-4 md:p-4 text-lg font-bold">Your Tracks</div>
        <BeatCards
          className1="mt-0 grid 2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3"
          className2="hidden"
          beats={beats}
        />
      </div>
    </>
  );
};

export default UserBeats;
