"use client";

import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import useSaveDiscardDraftModal from "@/hooks/useSaveDiscardDraftModal";
import { useFormContext } from "@/providers/FormProvider";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useDraftStore } from "@/hooks/useDraftStore";
import toast from "react-hot-toast";

const CancelTrack = () => {

  const { isOpen, onOpen } = useSaveDiscardDraftModal();

  return (
    <div className="w-full px-16 py-4 bg-[#141414]">
      <div className="text-xl  font-semibold flex items-center gap-x-2">
        <Tippy content="Back to tracks" placement="right">
          <div onClick={onOpen} className="cursor-pointer">
            <MdClose className="inline mr-2" size={35} />
            <div className="align-middle inline">Creating new track</div>
          </div>
        </Tippy>
      </div>
    </div>
  );
};

export default CancelTrack;
