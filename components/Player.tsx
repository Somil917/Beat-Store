"use client";

import useGetSongById from "@/hooks/useGetSongById";
import useLoadBeatUrl from "@/hooks/useLoadBeatUrl";
import usePlayer from "@/hooks/usePlayer";
import PlayerContent from "./PlayerContent";
import { AnimatePresence, easeOut, motion } from "framer-motion";

export const revalidate = 0;

const Player = () => {
  const player = usePlayer();
  const { beat } = useGetSongById(player.activeId);

  const beatUrl = useLoadBeatUrl(beat!);

  if (!beat || !player.activeId || !beatUrl) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ duration: 0.2, ease: easeOut }}
        className="
        w-full
        flex
        align-center
        border-t
        border-neutral-700/50
        bg-[#141414]
        fixed
        bottom-0
        left-0
        "
      >
        <div
          className="
            bg-[#141414]
            w-[100%]
            py-2
            h-[80px]
            max-w-[1519px]
            m-auto
            md:px-20
            px-4
        "
        >
          <PlayerContent key={beatUrl} beat={beat} beatUrl={beatUrl} />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Player;
