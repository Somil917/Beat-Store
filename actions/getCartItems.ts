import { Beat } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getCartItems = async (): Promise<any[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

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
    .from("cart")
    .select("*, beats(*), licenses(*)")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error);
    return [];
  }

  if (!data) {
    return [];
  }

  return data;
};

export default getCartItems;
