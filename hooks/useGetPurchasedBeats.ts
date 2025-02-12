import { Beat } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { cookies } from "next/headers";
import { useEffect, useMemo, useState } from "react";

const useGetPurchasedBeats = (id?: string) => {
  const [purchasedBeats, setPurchasedBeats] = useState<Beat[]>();
  const [purchasedBeatsDetails, setPurchasedBeatsDetails] = useState<any[]>(
    []
  );

  const { supabaseClient } = useSessionContext();

  useEffect(() => {
    if (!id) {
      return;
    }

    const fetchPurchasedBeats = async () => {
      const { data, error } = await supabaseClient
        .from("beat_purchases")
        .select("*, beats(*)")
        .eq("user_id", id)
        .order("created_at", { ascending: false });

      if (error) {
        console.log(error);
        return;
      }

      if (!data) {
        console.log("No Purchases found.");
        return;
      }

      setPurchasedBeats(
        (data.map((item) => ({
          ...item.beats,
        })) as Beat[])
      );

      setPurchasedBeatsDetails(
        data.map((item) => ({
          ...item,
        }))
      );
    };

    fetchPurchasedBeats();
  }, [supabaseClient, id]);

  return useMemo(
    () => ({
      purchasedBeats,
      purchasedBeatsDetails,
    }),
    [purchasedBeats, purchasedBeatsDetails]
  );
};

export default useGetPurchasedBeats;
