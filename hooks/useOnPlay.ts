import { Beat } from "@/types";
import usePlayer from "./usePlayer";

const useOnPlay = (beats: Beat[]) => {
  const player = usePlayer();

  const onPlay = (id: string) => {
    player.setId(id);
    player.setIds(beats.map((beat) => beat.id));
  };

  return onPlay;
};

export default useOnPlay;
