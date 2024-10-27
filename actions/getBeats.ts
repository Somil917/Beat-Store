import { Beat } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getBeats = async (): Promise<Beat[]> => {
    const supabase = createServerComponentClient({
        cookies: cookies
    })

    const { data, error } = await supabase
        .from('beats')
        .select('*')
        .order('created_at', { ascending: false });

    if(error){
        console.log(error)
    }

    return (data as any) || [];
}

export default getBeats;