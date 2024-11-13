import { create } from "zustand";

interface useTrackDetailsUploadStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useTrackDetailsUpload = create<useTrackDetailsUploadStore>((set) => ({
    isOpen: false,
    onOpen: () => {
        set({isOpen: true})
    },
    onClose: () => {
        set({isOpen: false})
    }
}))

export default useTrackDetailsUpload;