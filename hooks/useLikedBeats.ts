import { Beat } from "@/types";
import { create } from "zustand";

type likedBeatsStore = {
  likedBeats: Beat[];
  likeBeat: (beat: Beat) => void;
  dislikeBeat: (beatId: string) => void;
  setLikedBeats: (beats: Beat[]) => void;
  clearLikes: () => void;
};

export const useLikedBeats = create<likedBeatsStore>((set) => ({
  likedBeats: [],

  likeBeat: (beatId) => {
    set((state) => ({
      likedBeats: [...state.likedBeats, beatId],
    }));
  },

  dislikeBeat: (beatId) => {
    set((state) => ({
      likedBeats: state.likedBeats.filter((beat) => beat.id !== beatId),
    }));
  },

  setLikedBeats: (beats) => {
    set({ likedBeats: beats });
  },

  clearLikes: () => set({likedBeats: []}) 
}));
