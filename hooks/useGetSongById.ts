import { Beat } from "@/types";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useEffect, useMemo, useState } from "react"
import toast from "react-hot-toast";

const useGetSongById = (id?: string) => {
    const [isLoading, setIsLoading] = useState(false);
    const [beat, setBeat] = useState<Beat | undefined>(undefined)

    const { supabaseClient } = useSessionContext();

    useEffect(() => {
        if(!id){
            return;
        }

        setIsLoading(true)

        const fetchSong = async () => {
            const { data, error } = await supabaseClient
            .from('beats')
            .select('*')
            .eq('id', id)
            .single()

            if(error){
                setIsLoading(false)
                return toast.error(error.message)
            }

            setBeat(data as Beat);
            setIsLoading(false);
        }

        fetchSong();
    }, [supabaseClient, id])

    return useMemo(() => ({
        isLoading, beat
    }), [isLoading, beat])
}

export default useGetSongById