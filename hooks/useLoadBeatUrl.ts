import { Beat } from "@/types";
import { useSessionContext } from "@supabase/auth-helpers-react";

const useLoadBeatUrl = (beat: Beat) => {
    const { supabaseClient } = useSessionContext();

    if(!beat){
        return '';
    }

    const { data: beatData} = supabaseClient
    .storage
    .from('beats')
    .getPublicUrl(beat.beat_path)

    return beatData.publicUrl;
}

export default useLoadBeatUrl