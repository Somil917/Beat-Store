"use client";

import useAuthModal from "@/hooks/useAuthModal";
import { useLikedBeats } from "@/hooks/useLikedBeats";
import { useUser } from "@/hooks/useUser";
import { Beat } from "@/types";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { RiHeartFill, RiHeartLine } from "react-icons/ri";
import { twMerge } from "tailwind-merge";

interface LikeButtonProps {
  beatId: string;
  beat?: Beat;
  className?: string;
}

const LikeButton: React.FC<LikeButtonProps> = ({ beatId, beat, className }) => {
  const router = useRouter();

  const { user } = useUser();
  const { supabaseClient } = useSessionContext();
  // const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  const authModal = useAuthModal();

  const { likedBeats, likeBeat, dislikeBeat } = useLikedBeats();

  const isLiked = useMemo(() => {
    return likedBeats.some((b) => b.id === beatId);
  }, [likedBeats, beatId]);

  const Icon = isLiked ? RiHeartFill : RiHeartLine;

  const handleClick = async () => {
    if (!user) return authModal.onOpen("sign_in");

    setLoading(true);

    let error;
    if (isLiked) {
      dislikeBeat(beatId);
      const { error: deleteError } = await supabaseClient
        .from("liked_beats")
        .delete()
        .eq("user_id", user.id)
        .eq("beat_id", beatId);

      error = deleteError;
      if (deleteError) {
        likeBeat(beat!);
      }
    } else {
      likeBeat(beat!);
      const { error: insertError } = await supabaseClient
        .from("liked_beats")
        .insert({ beat_id: beatId, user_id: user.id });

      error = insertError;
      if (insertError) {
        dislikeBeat(beatId);
      }
    }

    if (error) {
      toast.error(error.message);
    } else {
      toast.success(isLiked ? "Unliked!" : "Liked!");
      // router.refresh();
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
