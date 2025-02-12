"use client";

import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { RiHeartFill, RiHeartLine } from "react-icons/ri";
import { twMerge } from "tailwind-merge";

interface LikeButtonProps {
    beatId: string;
    className?: string;
}

const LikeButton: React.FC<LikeButtonProps> = ({
    beatId,
    className,
}) => {
    const router = useRouter();

    const { user } = useUser();
    const { supabaseClient } = useSessionContext();
    const [isLiked, setIsLiked] = useState(false);
    const [loading, setLoading] = useState(false);

    const authModal = useAuthModal();

    // Memoize the fetch function to prevent unnecessary re-requests
    const fetchBeat = useCallback(async () => {
        if (!user?.id) return;

        const { data, error } = await supabaseClient
            .from("liked_beats")
            .select("*")
            .eq("user_id", user.id)
            .eq("beat_id", beatId)
            .single();

        if (!error && data) {
            setIsLiked(true);
        }
    }, [user?.id, beatId, supabaseClient]);

    useEffect(() => {
        // Only trigger fetch when user or beatId changes
        if (!user?.id || !beatId) return;

        fetchBeat(); // Fetch the like status for the given beatId
    }, [beatId, user?.id, fetchBeat]);

    const Icon = isLiked ? RiHeartFill : RiHeartLine;

    const handleClick = async () => {
        if (!user) return authModal.onOpen();

        setLoading(true);
        setIsLiked((prev) => !prev); // Optimistic UI update

        const { error } = isLiked
            ? await supabaseClient.from('liked_beats').delete().eq('user_id', user.id).eq('beat_id', beatId)
            : await supabaseClient.from('liked_beats').insert({ beat_id: beatId, user_id: user.id });

        if (error) {
            toast.error(error.message);
            setIsLiked((prev) => !prev); // Revert on error
        } else {
            toast.success(isLiked ? 'Unliked!' : 'Liked!');
            router.refresh();
        }

        setLoading(false);
    };

    return (
        <button
            className={twMerge(className)}
            onClick={handleClick}
            disabled={loading}
        >
            <Icon color={isLiked ? "red" : "white"} size={19} />
        </button>
    );
};

export default LikeButton;
