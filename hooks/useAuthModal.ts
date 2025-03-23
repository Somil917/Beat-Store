import {create} from 'zustand';

interface AuthModalStore { 
    isOpen: boolean;
    mode: "sign_in" | "sign_up";
    onOpen: (mode: "sign_in" | "sign_up") => void;
    onClose: () => void;
};

const useAuthModal = create<AuthModalStore>((set) => ({
    isOpen: false,
    mode: "sign_in",
    onOpen: (mode) => set({ isOpen: true, mode }),
    onClose: () => set({ isOpen: false }),
}));

export default useAuthModal;