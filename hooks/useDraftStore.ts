import { create } from "zustand";

interface DraftState {
  isCoverFetching: boolean;
  isAudioFetching: boolean;
  draftId: string | null;
  isCoverLoading: boolean;
  coverArt: string | null;
  audioFile: string | null;
  metadata: {
    title: string;
  } | null;
  setIsCoverFetching: (bool: boolean) => void;
  setIsAudioFetching: (bool: boolean) => void;
  setDraftId: (id: string | null) => void;
  setIsCoverLoading: (bool: boolean) => void;
  setCoverArt: (cover_public_url: string | null) => void;
  setAudioFile: (beat: string | null) => void;
  setMetaData: (data: { title: string; genre: string[] }) => void;
  clearDraft: () => void;
}

export const useDraftStore = create<DraftState>((set) => ({
  isCoverFetching: false,
  isAudioFetching: false,
  draftId: null,
  isCoverLoading: false,
  coverArt: null,
  audioFile: null,
  metadata: null,
  setIsCoverFetching: (bool) => set({ isCoverFetching: bool }),
  setIsAudioFetching: (bool) => set({ isAudioFetching: bool }),
  setDraftId: (id) => set({ draftId: id }),
  setIsCoverLoading: (bool) => set({ isCoverLoading: bool }),
  setCoverArt: (url) => set({ coverArt: url }),
  setAudioFile: (beat) => set({ audioFile: beat }),
  setMetaData: (data) => set({ metadata: data }),
  clearDraft: () => set({ coverArt: null, audioFile: null, metadata: null, draftId: null }),
}));
