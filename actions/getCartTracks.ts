import { Beat } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getCartTracks = async (): Promise<any[]> => {
    const supabase = createServerComponentClient({
        cookies: cookies
    })

    const { data, error } = await supabase
        .from('cart')
        .select('*, beats(*), licenses')
        .order('created_at', { ascending: false });

    if(error){
        console.log(error)
    }

    return (data as any) || [];
}

export default getCartTracks;