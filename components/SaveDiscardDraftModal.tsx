"use client";

import { useDraftStore } from "@/hooks/useDraftStore";
import useSaveDiscardDraftModal from "@/hooks/useSaveDiscardDraftModal";
import { useUser } from "@/hooks/useUser";
import { useFormContext } from "@/providers/FormProvider";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { MdClose } from "react-icons/md";

const SaveDiscardDraftModal = () => {
  const { isOpen, onClose } = useSaveDiscardDraftModal();
  const { formData } = useFormContext();
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const supabase = useSupabaseClient();
  const { draftId } = useDraftStore();
  const router = useRouter();
  const { user } = useUser();

  const handleOnSaveDraft = async () => {
    if (!formData.beatinfo || !draftId) return;

    try {
      setIsSaving(true);

      const { error: saveError } = await supabase
        .from("drafts")
        .update({
          metadata: formData.beatinfo,
          is_saved: true,
        })
        .eq("id", draftId)
        .single();

      if (saveError) {
        setIsSaving(false);
        return toast.error(saveError.message);
      }

      setIsSaving(false);
      router.refresh();
      toast.success("Draft saved successfully");
      router.replace("/content/tracks/uploaded");
      localStorage.clear();
      onClose();
    } catch (error) {
      toast.error("Failed saving draft");
    } finally {
      setIsSaving(false);
    }
  };

  const handleOnDiscardDraft = async () => {
    if (!user || !draftId) return;

    try {
      setIsDeleting(false);

      const { error: deleteError } = await supabase
        .from("drafts")
        .delete()
        .eq("user_id", user.id)
        .eq("id", draftId)
        .single();

      if (deleteError) {
        setIsDeleting(false);
        return toast.error(deleteError.message);
      }

      setIsDeleting(false);
      router.refresh();
      toast.success("Draft Deleted successfully");
      router.replace("/content/tracks/uploaded");
      localStorage.clear();
      onClose();
    } catch (error) {
      toast.error("Failed Deleting Draft");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 1, scale: 1 }}
          aria-modal="true"
          role="dialog"
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        >
          <div className="bg-[#141414] p-7 rounded-md relative">
            <MdClose
              onClick={onClose}
              className="cursor-pointer absolute top-5 right-5"
              size={33}
            />
            <div className=" my-1 w-full">
              <h2 className="text-lg font-semibold">
                Do you want to save the draft?
              </h2>
            </div>
            <p className="mb-10 flex-wrap">
              If you delete your draft, all the info you changed will be <br />{" "}
              discarded
            </p>
            <div className="flex justify-end my-2 pt-6 border-t border-neutral-700/50 ">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleOnDiscardDraft();
                }}
                className="px-4 py-1 hover:bg-neutral-700 active:outline active:outline-[6px] active:outline-neutral-800 rounded-md mr-4 border border-neutral-700/50 bg-neutral-800"
              >
                Delete Draft
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleOnSaveDraft();
                }}
                className="px-4 hover:bg-blue-700 active:outline active:outline-[6px] active:outline-blue-800 active:bg-blue-500 active:text-black py-1 rounded-md border border-neutral-700/50 bg-blue-800 text-white"
              >
                Save Draft
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SaveDiscardDraftModal;
