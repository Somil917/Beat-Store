import { create } from "zustand";

interface useSaveDiscardDraftModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useSaveDiscardDraftModal = create<useSaveDiscardDraftModalStore>(
  (set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  })
);

export default useSaveDiscardDraftModal;
