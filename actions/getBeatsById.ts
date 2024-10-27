import { Beat } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getBeatsById = async (): Promise<Beat[]> => {
    const supabase = createServerComponentClient({
        cookies: cookies
    })

    const {data: {session},} = await supabase.auth.getSession();

    const { data, error } = await supabase
        .from('beats')
        .select('*')
        .eq('user_id', session?.user?.id)
        .order('created_at', { ascending: false });

    if(error){
        console.log(error)
    }

    return (data as any) || [];
}

export default getBeatsById;