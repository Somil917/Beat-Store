import { Draft } from "@/types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useMemo } from "react";

const useLoadDraftImage = (draft: Draft | null) => {
    const supabase = useSupabaseClient();

    const draftImageUrl = useMemo(() => {
        if (!draft || !draft.cover_art_url) {
            return null;
        }

        const { data } = supabase
            .storage
            .from("images")
            .getPublicUrl(draft.cover_art_url);

        return data?.publicUrl || null;
    }, [draft, supabase]);

    return draftImageUrl;
}

export default useLoadDraftImage;
