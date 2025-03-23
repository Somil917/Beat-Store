"use client";

import { useEffect, useRef } from "react";
import useSaveDiscardDraftModal from "@/hooks/useSaveDiscardDraftModal";

const useProtectUploadRoute = () => {
  const { onOpen } = useSaveDiscardDraftModal();
  const isBlocked = useRef(false);

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (!isBlocked.current) {
        console.log("Back button clicked. Opening modal...");
        onOpen();

        // Push the current state back to prevent navigation
        window.history.pushState(null, "", window.location.pathname);

        // Block further popstate events until the user interacts with the modal
        isBlocked.current = true;

        // Reset the block after a short delay to allow the user interaction
        setTimeout(() => {
          isBlocked.current = false;
        }, 500);
      }
    };

    // Push initial state to detect back button clicks
    window.history.pushState(null, "", window.location.pathname);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [onOpen]);
};

export default useProtectUploadRoute;
