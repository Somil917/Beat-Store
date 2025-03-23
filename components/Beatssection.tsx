import getBeats from "@/actions/getBeats";
import BeatCards from "./BeatCards";
import Link from "next/link";
import React from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

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
  const beats = await getBeats(6);

  return (
    <>
      <div className="bg-[#141414] max-w-[1519px] m-auto py-8 md:px-16 lg:px-10 xl:px-20 2xl:px-20">
        <div className="flex justify-between px-6 md:px-0">
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
