import getBeats from "@/actions/getBeats";
import BeatCards from "./BeatCards";
import Link from "next/link";
import React from "react";

export const revalidate = 0;

interface BeatssectionProps {
  title?: string;
  navigate?: string;
  href: string;
}

const Beatssection: React.FC<BeatssectionProps> = async ({
  title,
  navigate,
  href,
}) => {
  const beats = await getBeats();

  return (
    <>
      <div className="bg-[#141414] py-8 px-28">
        <div className="flex justify-between ">
          <h1 className="text-xl font-semibold">{title}</h1>
          <Link
            href={href}
            className="text-md text-neutral-400 hover:text-neutral-50 cursor-pointer"
          >
            {beats.length > 0 && navigate}
          </Link>
        </div>
        <BeatCards limit={6} beats={beats} />
      </div>
    </>
  );
};

export default Beatssection;
