"use client";

import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import BeatDetails from "../components/BeatDetails";
import PlayBtn from "@/components/PlayBtn";
import PlayBeatWithGraph from "../components/PlayBeatWithGraph";
import BeatLicensing from "../components/BeatLicensing";

const Beat = () => {
  const supabase = useSupabaseClient();

  const params = useParams();
  const slug = params.slug;
  const [beatDetails, setBeatDetails] = useState<any>(null);

  const fetchBeat = useCallback(
    async (id: number) => {
      try {
        const { data, error } = await supabase
          .from("beats")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          toast.error(error.message);
          return null;
        }

        if (!data) {
          toast.error("No beat found with this ID.");
          return null;
        }

        return data;
      } catch (error) {
        toast.error((error as Error).message);
        return null;
      }
    },
    [supabase]
  );

  useEffect(() => {
    const getBeatDetails = async () => {
      if (slug && !beatDetails) {
        const slugString = Array.isArray(slug) ? slug[0] : slug;
        const beatIdString = slugString.split("-").pop();
        const beatId = Number(beatIdString);

        const data = await fetchBeat(beatId);
        if (data) {
          // console.log("Fetched beat details successfully:", data);
          setBeatDetails(data);
        } else {
          console.error("Failed to fetch beat details for ID:", beatId);
        }
      }
    };

    getBeatDetails();
  }, [slug, fetchBeat, beatDetails]);

  if (!beatDetails) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="w-full min-h-screen max-w-[1519px] m-auto bg-[#090909] p-4 md:px-20 flex flex-col md:flex-row justify-between items-center md:items-start py-28">
        <BeatDetails beat={beatDetails} />
        <div className="md:w-[74%] w-full px-4 md:px-0 flex flex-col gap-y-7">
          <PlayBeatWithGraph beat={beatDetails} />
          <BeatLicensing beat={beatDetails} />
        </div>
      </div>
    </>
  );
};

export default Beat;
