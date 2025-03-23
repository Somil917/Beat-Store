"use client";

import useTrackDetailsUpload from "@/hooks/useTrackDetailsUpload";
import { motion, AnimatePresence } from "framer-motion";
import Input from "./Input";
import uniqid from "uniqid";
import { IoMdClose } from "react-icons/io";
import { IoCloseOutline, IoCloudUploadOutline } from "react-icons/io5";
import { useUser } from "@/hooks/useUser";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";
import { useDraftStore } from "@/hooks/useDraftStore";
import { CgMoreVerticalO } from "react-icons/cg";
import { FaLeaf } from "react-icons/fa";

export interface TrackDetailsUploadModalProps {
  title?: string;
  description?: string;
  name?: string;
  accept?: string;
  children?: React.ReactNode;
}

type Draft = { cover_art_url: string } | { audio_file_url: string };

const TrackDetailsUploadModal: React.FC<TrackDetailsUploadModalProps> = ({
  title,
  description,
  name,
  accept,
  children,
}) => {
  const { register, reset, handleSubmit } = useForm();

  const { isOpen, onClose } = useTrackDetailsUpload();
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const { user } = useUser();
  // const supabaseClient = useSupabaseClient();
  const { supabaseClient } = useSessionContext();
  const router = useRouter();
  const pathname = usePathname();
  const {
    draftId,
    setDraftId,
    setCoverArt,
    coverArt,
    setIsCoverFetching,
    setIsAudioFetching,
    setAudioFile,
    setIsCoverLoading,
    audioFile,
  } = useDraftStore();

  const hasCreatedDraft = useRef(false);

  //create draft if not existing
  const [isCreatingDraft, setIsCreatingDraft] = useState(false);

  const createDraft = useCallback(async () => {
    if (!user || draftId || isCreatingDraft) return draftId;

    setIsCreatingDraft(true);
    try {
      const { data: draftData, error } = await supabaseClient
        .from("drafts")
        .insert({ user_id: user.id, is_saved: false, is_published: false })
        .select("id")
        .single();

      if (error) {
        return toast.error("Failed to create draft");
      }

      if (draftData && draftData.id) {
        setDraftId(draftData.id);
        return draftData.id;
      }
    } catch (error) {
      toast.error("Failed to create draft");
    } finally {
      setIsCreatingDraft(false);
    }

    return null;
  }, [draftId, setDraftId, supabaseClient, user, isCreatingDraft]);

  //Fetch unsaved draftid on each reload

  useEffect(() => {
    if (!user || draftId || hasCreatedDraft.current) return;

    const fetchDraft = async () => {
      const { data: unsavedDraft, error } = await supabaseClient
        .from("drafts")
        .select("id")
        .eq("user_id", user.id)
        .eq("is_saved", false)
        .maybeSingle();

      if (error) {
        toast.error(error.message);
        return;
      }

      if (unsavedDraft) {
        setDraftId(unsavedDraft.id);
      } else {
        const newDraftId = await createDraft();
        setDraftId(newDraftId);
      }
    };

    fetchDraft();
    hasCreatedDraft.current = true;
  }, [user, supabaseClient, createDraft, setDraftId, draftId]);

  //Handle file upload
  const handleFileUpload = async (file: File, fileType: "beat" | "cover") => {
    if (isLoading) return; //prevent re-triggering the upload

    setIsLoading(true);
    try {
      const storagePath = fileType === "beat" ? "beats" : "images";
      const { data, error } = await supabaseClient.storage
        .from(storagePath)
        .upload(`${fileType}-${draftId}`, file, {
          cacheControl: "public max-age=3600 must-revalidate",
          upsert: true,
        });

      if (error) {
        return toast.error("Failed to upload file");
      }

      const updateColumn =
        fileType === "beat"
          ? { audio_file_url: data.path }
          : { cover_art_url: data.path };

      const { error: draftUpdateError } = await supabaseClient
        .from("drafts")
        .update(updateColumn)
        .eq("id", draftId);
      if (draftUpdateError) {
        toast.error(draftUpdateError.message);
      }
      toast.success(`${fileType} uploaded successfully`);

      await fetchFile(fileType);

      onClose();
    } catch (error) {
      console.error("Error during file upload: ", error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const isCoverDraft = (draft: Draft): draft is { cover_art_url: string } =>
    "cover_art_url" in draft;

  const fetchFile = useCallback(
    async (fileType: "cover" | "beat") => {
      if (!user || !draftId) return;

      const loadingSetter =
        fileType === "cover" ? setIsCoverFetching : setIsAudioFetching;
      loadingSetter(true);
      try {
        setIsCoverLoading(true);

        const columnToSelect =
          fileType === "cover" ? "cover_art_url" : "audio_file_url";
        const { data: draft, error: draftError } = await supabaseClient
          .from("drafts")
          .select(columnToSelect)
          .eq("user_id", user.id)
          .eq("id", draftId)
          .maybeSingle();

        if (draftError) {
          return toast.error(draftError.message);
        }

        if (!draft) return;

        // Determine the file path based on fileType
        const filePath = isCoverDraft(draft)
          ? fileType === "cover" && draft.cover_art_url
          : fileType === "beat" &&
            (draft as { audio_file_url: string }).audio_file_url;

        if (filePath) {
          const storageBucket = fileType === "cover" ? "images" : "beats";

          const { data: fileData } = await supabaseClient.storage
            .from(storageBucket)
            .getPublicUrl(filePath);

          const publicUrl = `${fileData.publicUrl}?t=${new Date().getTime()}`; //cache busting

          if (fileType === "cover") {
            setCoverArt(publicUrl);
          } else {
            setAudioFile(publicUrl);
          }
        }

        //Fetch the coverArt if uploaded
        // if (draft?.cover_art_url) {
        //   const { data: cover_Art } = await supabaseClient.storage
        //     .from("images")
        //     .getPublicUrl(draft.cover_art_url);

        //   const latestCoverArtUrl = `${
        //     cover_Art.publicUrl
        //   }?t=${new Date().getTime()}`; // cache busting

        //   setCoverArt(latestCoverArtUrl);
        // }
      } catch (error) {
        return toast.error("Something went wrong");
      } finally {
        loadingSetter(false);
      }
    },
    [
      draftId,
      supabaseClient,
      setIsCoverFetching,
      setIsAudioFetching,
      user,
      setCoverArt,
      setIsCoverLoading,
      setAudioFile,
    ]
  );

  useEffect(() => {
    const fetchCoverArt = async () => {
      if (!coverArt) {
        setIsCoverFetching(true);
        await fetchFile("cover");
        setIsCoverFetching(false);
      }
    };

    fetchCoverArt();
  }, [coverArt, fetchFile, setIsCoverFetching]);

  useEffect(() => {
    const fetchAudioFile = async () => {
      if (!audioFile) {
        await fetchFile("beat");
      }
    };

    fetchAudioFile();
  }, [audioFile, fetchFile]);

  const handleCloseTrackDetailsModal = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    onClose();
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
          <div className="sm:w-[55%] w-[80%] relative sm:h-[85%] flex flex-col gap-y-6 rounded-md p-7 bg-[#141414]">
            <div className="flex justify-between items-center w-full">
              <h1 className="text-xl font-semibold">{title}</h1>
              <button
                aria-label="Close"
                className=" m-0 p-0"
                onClick={handleCloseTrackDetailsModal}
              >
                <IoCloseOutline size={46} />
              </button>
            </div>
            <Input
              type="file"
              disabled={isLoading}
              id={name}
              className="hidden"
              {...register(`${name}`)}
              alt="coverart"
              accept={accept}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  try {
                    if (name === "cover") {
                      handleFileUpload(file, "cover");
                    } else {
                      handleFileUpload(file, "beat");
                    }
                  } catch (error) {
                    console.log("file upload failed", error);
                    toast.error("failed to upload file");
                  }
                }
              }}
            />
            <label
              htmlFor={name}
              className={` flex flex-col items-center w-full ${
                isLoading ? "text-neutral-700" : "text-neutral-300"
              }  cursor-pointer py-9 border-[1px] border-neutral-400 border-dashed rounded-md `}
            >
              <IoCloudUploadOutline size={70} />
              <div className="font-semibold text-slate-100">
                Drag & Drop, or{" "}
                <span className="text-blue-600 underline-offset-1 underline">
                  browse
                </span>
                <div className="text-sm text-center text-neutral-400">
                  {description}
                </div>
              </div>
            </label>
            <div>{children}</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TrackDetailsUploadModal;
