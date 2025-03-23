// components/PopUpModal.tsx
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PopUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const PopUpModal: React.FC<PopUpModalProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted || !isOpen) return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 1, scale: 1 }}
        aria-modal="true"
        role="dialog"
        className="fixed inset-0 hidden sm:flex max-w-[1519px] m-auto items-center justify-center bg-black bg-opacity-70 z-50"
      >
        {children}
      </motion.div>
    </AnimatePresence>,
    document.body
  );
};

export default PopUpModal;
