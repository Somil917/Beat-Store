import { Beat } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getBeats = async (limit: number, cursor?: string): Promise<Beat[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  let query = supabase
    .from("beats")
    .select(`*, licenses(price)`)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (cursor) {
    query = query.filter("created_at", "<", cursor);
  }

  const { data, error } = await query;

  if (error) {
    console.log(error);
  }

  return (
    (data as any)?.map((beat: any) => ({
      ...beat,
      licensePrice: beat.licenses?.length
        ? Math.min(...beat.licenses.map((l: any) => l.price))
        : null,
    })) || []
  );
};

export default getBeats;
