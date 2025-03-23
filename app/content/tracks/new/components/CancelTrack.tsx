"use client";

import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import useSaveDiscardDraftModal from "@/hooks/useSaveDiscardDraftModal";
import { IoMdAdd } from "react-icons/io";
import { useRouter } from "next/navigation";
import { useDraftStore } from "@/hooks/useDraftStore";

interface CancelTrackProps {
  uploadedRoute?: boolean;
}

const CancelTrack: React.FC<CancelTrackProps> = ({ uploadedRoute }) => {
  const { isOpen, onOpen } = useSaveDiscardDraftModal();
  const router = useRouter();

  const { clearDraft, draftId } = useDraftStore();

  useEffect(() => {
    const handlePopState = () => {
      router.push("/");
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [router]);

  return (
    <div className="w-full px-6  sm:px-16 py-4 bg-[#141414]">
      <div className="text-xl max-w-[1519px] mx-auto font-semibold flex items-center gap-x-2">
        {!uploadedRoute ? (
          <Tippy content="Back to tracks" placement="right">
            <div onClick={onOpen} className="cursor-pointer">
              <MdClose className="inline mr-2" size={35} />
              <div className="align-middle inline">Creating new track</div>
            </div>
          </Tippy>
        ) : (
          <div className="w-full flex justify-between items-center">
            <div className="cursor-pointer">Uploaded</div>
            <div className="px-3 flex items-center gap-x-1 py-[3px] text-[13px] bg-blue-600 hover:bg-blue-500/90 cursor-pointer rounded-md">
              <IoMdAdd size={20} />
              <div
                onClick={() => {
                  clearDraft();
                  router.push("/content/tracks/new/files");
                }}
              >
                Add Track
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CancelTrack;
