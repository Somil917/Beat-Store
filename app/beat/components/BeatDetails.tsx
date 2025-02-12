import useLoadImage from "@/hooks/useLoadImage";
import { Beat } from "@/types";
import Image from "next/image";
import React from "react";

interface BeatDetailsProps {
  beat: Beat;
}

const BeatDetails: React.FC<BeatDetailsProps> = ({ beat }) => {
  const beatCover = useLoadImage(beat);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };

  return (
    <div className="md:w-[24%] w-full flex gap-y-4 flex-col md:px-6 px-4 rounded-md items-center py-10 md:bg-[#141414]">
      <div className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
        <Image
          src={beatCover ? beatCover : ""}
          alt="cover"
          fill
          className="object-cover"
        />
      </div>
      <div className="w-full flex flex-col items-center gap-2">
        <h1 className="text-2xl font-medium text-center leading-7">
          {beat?.title}
        </h1>
        <p className="text-neutral-400 text-sm">{beat?.author}</p>
      </div>
      <hr className="w-full border-0 h-[1.5px] bg-neutral-700/70" />
      <table className=" w-full">
        <tbody>
          <tr className="text-xs text-neutral-500">
            <td className="pb-3 text-xs">INFORMATION</td>
          </tr>
          <tr className="text-sm text-neutral-400">
            <td className="pb-2">Published</td>
            <td className="text-right pb-2">
              {new Date(beat?.created_at).toLocaleDateString("en-GB", options)}
            </td>
          </tr>
          <tr className="text-sm text-neutral-400">
            <td className="pb-2 align-top">BPM</td>
            <td className="text-right pb-2">{beat?.bpm}</td>
          </tr>
          <tr className="text-sm text-neutral-400">
            <td className="pb-2 align-top">Key</td>
            <td className="text-right pb-2">{beat?.key}</td>
          </tr>
        </tbody>
      </table>
      <hr className="w-full border-0 h-[1.5px] bg-neutral-700/70" />
      <div className="w-full flex flex-col gap-y-2">
        <p className="text-neutral-500 text-xs">TAGS</p>
        <div className="w-full flex flex-wrap gap-2">
          {beat?.tags ? (
            beat.tags.map((tag) => (
              <div
                className="text-sm text-neutral-400 cursor-pointer hover:text-neutral-100 hover:bg-neutral-700 px-4 py-1 bg-neutral-800 rounded-full"
                key={tag}
              >
                {"#" + tag}
              </div>
            ))
          ) : (
            <p className="text-sm text-neutral-400">No tags</p>
          )}
        </div>
      </div>
      <hr className="w-full border-0 h-[1.5px] bg-neutral-700/70" />
      <div className="w-full flex flex-col gap-y-2">
        <p className="text-neutral-500 text-xs">ABOUT</p>
        <div></div>
      </div>
    </div>
  );
};

export default BeatDetails;
