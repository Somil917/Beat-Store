import { create } from "zustand";

interface PlayerStore {
  ids: string[];
  activeId?: string;
  isPlaying: boolean;
  currentTime: number,
  setId: (id: string) => void;
  setIds: (ids: string[]) => void;
  play: () => void;
  pause: () => void;
  setCurrentTime: (time: number) => void;
  togglePlay: () => void;
  setPlayingState: (isPlaying: boolean) => void;
  reset: () => void;
}

const usePlayer = create<PlayerStore>((set) => ({
  ids: [],
  activeId: undefined,
  isPlaying: false,
  currentTime: 0,
  setId: (id: string) => set({ activeId: id }),
  setIds: (ids: string[]) => set({ ids: ids }),
  play: () => set({ isPlaying: true }),
  pause: () => set({ isPlaying: false }),
  setCurrentTime: (time: number) => set({ currentTime: time }), 
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setPlayingState: (isPlaying: boolean) => set({ isPlaying }),
  reset: () => set({ ids: [], activeId: undefined }),
}));

export default usePlayer;
