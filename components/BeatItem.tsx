"use client";

import useLoadImage from "@/hooks/useLoadImage";
import { Beat } from "@/types";
import qs from "query-string";
import Image from "next/image";
import { FaPlay, FaRegPlayCircle } from "react-icons/fa";
import PlayBtn from "./PlayBtn";
import LikeButton from "./LikeButton";
import useOnPlay from "@/hooks/useOnPlay";
import { BsPauseBtn } from "react-icons/bs";
import { twMerge } from "tailwind-merge";
import { useRouter } from "next/navigation";
import useGetUserById from "@/hooks/useGetUserById";
import { useEffect } from "react";
import BeatPurchaseBtn from "./BeatPurchaseBtn";
import useLoadBeatUrl from "@/hooks/useLoadBeatUrl";
import { useUser } from "@/hooks/useUser";
import useGetPurchasedBeats from "@/hooks/useGetPurchasedBeats";
import { FiDownload } from "react-icons/fi";
import { HiDownload } from "react-icons/hi";
import { MdDownload } from "react-icons/md";
import { RiDownload2Fill } from "react-icons/ri";
import { IoMdDownload } from "react-icons/io";

interface BeatItemProps {
  data: Beat;
  className?: string;
  onClick: (id: string) => void;
}

const BeatItem: React.FC<BeatItemProps> = ({ data, className, onClick }) => {
  const imagePath = useLoadImage(data);
  const router = useRouter();
  const { user } = useUser();
  const { purchasedBeatsDetails } = useGetPurchasedBeats(user?.id);

  const beatUrl = useLoadBeatUrl(data);

  const { isLoading, userDetails } = useGetUserById(data.user_id);

  const beatTitleSlug = `${data.title
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, "")
    .replace(/\s+/g, "-")}-${data.id}`;

  const usernameSlug = `${userDetails?.display_name}`;

  const openBeat = () => {
    router.push(`/beat/${beatTitleSlug}`);
  };

  const openUserChannel = () => {
    if (!isLoading && usernameSlug !== undefined) {
      router.push(`/${usernameSlug}`);
    }
  };

  return (
    <div
      className={twMerge(
        `
                relative
                group
                flex
                flex-col
                items-center
                justify-center
                rounded-md
                overflow-hidden
                gap-x-4
                hover:bg-neutral-400/10
                transition
                md:p-4
                p-2
        `,
        className
      )}
    >
      <div
        className="
                relative
                group
                aspect-square
                w-full
                h-full
                rounded-md
                transition
                overflow-hidden
                border
                border-neutral-700
            "
      >
        <Image
          onClick={openBeat}
          className="object-cover cursor-pointer"
          fill
          src={imagePath || "../public/images/next.svg"}
          alt={data.title}
          quality={75}
          sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* <div
          className={`
                top-2
                left-2
                bg-neutral-900/40
                md:bg-transparent
                md:group-hover:bg-neutral-900/30
                transition
                p-2
                rounded-full
                flex
                justify-center
                items-center
                ${
                  purchasedBeatsDetails.some((item) => item.beat_id === data.id)
                    ? "absolute"
                    : "hidden"
                }
            `}
        >
          {purchasedBeatsDetails.some((item) => item.beat_id === data.id) && (
            <button
              onClick={async (e) => {
                e.preventDefault();
                try {
                  const response = await fetch(beatUrl, { mode: "cors" });
                  const blob = await response.blob();
                  const blobUrl = URL.createObjectURL(blob);

                  const link = document.createElement("a");
                  link.href = blobUrl;
                  link.setAttribute("download", `${data.title}.mp3`); // Suggested filename
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);

                  // Clean up Blob URL
                  URL.revokeObjectURL(blobUrl);
                } catch (error) {
                  console.error("Download failed:", error);
                }
              }}
              className="cursor-pointer"
            >
              <IoMdDownload size={22} />
            </button>
          )}
        </div> */}
        <div
          className="
                absolute
                top-2
                right-2
                bg-neutral-900/40
                md:bg-transparent
                md:group-hover:bg-neutral-900/30
                transition
                p-2
                rounded-full
                flex
                justify-center
                items-center
                "
        >
          <LikeButton
            className="md:opacity-0 transition w-full opacity-100 md:group-hover:opacity-100"
            beatId={data.id}
          />
        </div>
        <div
          onClick={() => onClick(data.id)}
          className="
                    absolute
                    top-1/2 
                    left-1/2
                    rounded-full
                    transform -translate-x-1/2 -translate-y-1/2
                "
        >
          <PlayBtn beat={data} />
        </div>
      </div>
      <div className="flex flex-col pt-4 w-full gap-y-1">
        <p
          onClick={openBeat}
          className="truncate font-semibold w-full cursor-pointer hover:underline"
        >
          {data.title}
        </p>
        <div className="flex items-center justify-around w-full ">
          <p
            onClick={openUserChannel}
            className="text-neutral-400 hover:underline cursor-pointer text-sm pb-1 w-full truncate pr-1"
          >
            By {data.author}
          </p>
          <div className="w-full flex justify-between items-center">
            <p className="text-blue-600 text-sm pb-1 truncate">
              {data.bpm} BPM
            </p>
            <p className="text-neutral-400 hidden xl:block text-sm pb-1 bg-">
              {data.key}
            </p>
          </div>
        </div>
        <div className="w-full flex justify-center items-center gap-x-2">
          <BeatPurchaseBtn
            key={data.id}
            beatId={data.id}
            beatPrice={data.bpm}
            beat={data}
          />
          {purchasedBeatsDetails.some((item) => item.beat_id === data.id) && (
            <button
              onClick={async (e) => {
                e.preventDefault();
                try {
                  const response = await fetch(beatUrl, { mode: "cors" });
                  const blob = await response.blob();
                  const blobUrl = URL.createObjectURL(blob);

                  const link = document.createElement("a");
                  link.href = blobUrl;
                  link.setAttribute("download", `${data.title}.mp3`); // Suggested filename
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);

                  // Clean up Blob URL
                  URL.revokeObjectURL(blobUrl);
                } catch (error) {
                  console.error("Download failed:", error);
                }
              }}
              className="cursor-pointer h-full hover:bg-blue-950/60 px-3 py-2 border rounded-md border-blue-700"
            >
              <IoMdDownload size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BeatItem;
