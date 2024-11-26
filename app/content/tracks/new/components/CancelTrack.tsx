"use client";

import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import useSaveDiscardDraftModal from "@/hooks/useSaveDiscardDraftModal";
import { IoMdAdd } from "react-icons/io";

interface CancelTrackProps {
  uploadedRoute?: boolean;
}

const CancelTrack: React.FC<CancelTrackProps> = ({ uploadedRoute }) => {
  const { isOpen, onOpen } = useSaveDiscardDraftModal();

  return (
    <div className="w-full px-6 sm:px-16 py-4 bg-[#141414]">
      <div className="text-xl  font-semibold flex items-center gap-x-2">
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
              <div>Add Track</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CancelTrack;
