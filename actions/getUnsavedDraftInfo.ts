import { Draft } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getDrafts = async (): Promise<Draft | null> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data, error } = await supabase
    .from("drafts")
    .select("*")
    .eq("user_id", session?.user?.id)
    .eq("is_saved", false)
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  if (!data) {
    return null;
  }

  return (data as any);
};

export default getDrafts;
