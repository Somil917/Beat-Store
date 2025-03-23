// hooks/useGetLicensesByBeatId.ts
import { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const useGetLicensesByBeatId = () => {
  const supabase = useSupabaseClient();
  const [isLoading, setIsLoading] = useState(false);
  const [licenses, setLicenses] = useState<any[]>([]);

  const fetchLicenses = async (beatId: string) => {
    if (!beatId) return;

    setIsLoading(true);
    const { data, error } = await supabase
      .from("licenses")
      .select("*")
      .eq("beat_id", beatId);

    if (error) {
      console.error("Error fetching licenses:", error);
    } else {
      setLicenses(data || []);
    }
    setIsLoading(false);
  };

  return { isLoading, licenses, fetchLicenses };
};

export default useGetLicensesByBeatId;