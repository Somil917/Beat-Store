"use client";

import getLikedBeats from "@/actions/getLikedBeats";
import { useLikedBeats } from "@/hooks/useLikedBeats";
import { useUser } from "@/hooks/useUser";
import { useEffect } from "react";

const LikedBeatsProvider = () => {
  const { user } = useUser();
  const { setLikedBeats, clearLikes } = useLikedBeats();

  useEffect(() => {
    async function fetchLikedBeats() {
      if (!user) {
        clearLikes();
        return;
      }

      const likedBeats = await getLikedBeats();
      setLikedBeats(likedBeats);
    }

    fetchLikedBeats();
  }, [user]);

  return null;
};

export default LikedBeatsProvider;
