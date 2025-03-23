import { Beat } from "@/types";
import { createClientComponentClient, createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getLikedBeats = async (): Promise<Beat[]> => {
  const supabase = createClientComponentClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    console.error("Error fetching user:", userError);
    return [];
  }

  if (!user) {
    console.warn("No authenticated user found");
    return [];
  }

  const { data, error } = await supabase
    .from("liked_beats")
    .select("beats(*, licenses(price))")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error);
    return [];
  }

  if (!data) {
    return [];
  }

  return data.map((item: any) => ({
    ...item.beats,
  }));
};

export default getLikedBeats;
