"use client";

import { useFormContext } from "@/providers/FormProvider";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";
import NavigateRoutes from "./NavigateRoutes";
import { IoIosPlay, IoMdMusicalNote, IoMdPause } from "react-icons/io";
import useTrackDetailsUpload from "@/hooks/useTrackDetailsUpload";
import TrackDetailsUploadModal from "@/components/TrackDetailsUploadModal";
import { IoFolderOpenSharp } from "react-icons/io5";
import { useDraftStore } from "@/hooks/useDraftStore";
import DraftAudioPlayer from "./DraftAudioPlayer";
import { TbReplace } from "react-icons/tb";
import Image from "next/image";

const UploadBeat = () => {
  const { formData, updateFormData } = useFormContext();
  const router = useRouter();
  const trackDetailsUploadModal = useTrackDetailsUpload();
  const [modalData, setModalData] = useState({
    title: "",
    description: "",
    name: "",
    accept: "",
  });
  const { audioFile, coverArt } = useDraftStore();

  const [isPlayerVisible, setIsPlayerVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleOpenTrackDetailsModal = (
    title: string,
    description: string,
    accept: string,
    name: string
  ) => {
    setModalData({ title, description, accept, name });
    trackDetailsUploadModal.onOpen();
  };

  const handlePlayPause = () => {
    if (audioFile) {
      setIsPlayerVisible(true);
      setIsPlaying((prevState) => !prevState);
    }
  };

  return (
    <div className=" bg-[#141414] px-8 py-5 2xl:w-[50%] xl:w-[55%] lg:w-[60%] md:w-[80%] w-[90%] rounded-md border border-neutral-700/50">
      <div className="flex flex-col gap-y-6  h-full">
        <NavigateRoutes />
        <form className="flex flex-col gap-y-5">
          <div>
            <div className="text-sm text-neutral-500 mb-2">
              AUDIO FILES FOR DOWNLOAD
            </div>
            <div className="text-xl mb-2 font-semibold ">Upload WAV/MP3</div>
            <div className="text-[13px] mb-4">
              We will convert the WAV file into an (un-tagged & tagged) MP3 file
              for streaming and purchasing purposes.
            </div>
            <div className="w-full flex flex-col sm:flex-row gap-4 sm:gap-0 justify-between items-center px-4 py-3 rounded-md border border-neutral-700/60">
              <div className="flex flex-col sm:flex-row gap-x-3 items-center">
                <div className="relative inline-block">
                  <div className="circular-border inset-0 absolute"></div>
                  <div className="z-10 transition w-[50px] h-[50px] flex justify-center items-center p-2 rounded-full">
                    <IoMdMusicalNote
                      className={`transition ${
                        !audioFile ? "text-neutral-400" : "text-green-400"
                      }`}
                      size={30}
                    />
                  </div>
                </div>
                <div className="w-full flex items-center sm:items-start flex-col justify-center">
                  <div className="text-lg font-medium ">Un-tagged audio</div>
                  <p className="text-sm text-neutral-400">
                    Upload .mp3 or .wav files only
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handlePlayPause();
                  }}
                  disabled={!audioFile}
                  className={`align-middle w-[100px] flex justify-center items-center px-4 py-2 font-medium rounded-full ${
                    !audioFile
                      ? "text-neutral-400 bg-neutral-800"
                      : "text-blue-500 hover:bg-blue-800/40 active:outline active:outline-[6px] active:outline-blue-800/40 active:bg-blue-700 active:text-black bg-blue-800/20  cursor-pointer"
                  } `}
                >
                  {isPlayerVisible && isPlaying ? (
                    <span className="flex w-full justify-center items-center align-middle gap-[1px]">
                      <IoMdPause size={20} /> Pause
                    </span>
                  ) : (
                    <span className="flex w-full justify-center items-center align-middle gap-[1px]">
                      <IoIosPlay size={25} /> Play
                    </span>
                  )}
                </button>
                <div
                  className={`absolute overflow-hidden m-auto w-full  left-0 py-4 px-2 z-30 bottom-0  ${
                    isPlayerVisible ? "flex" : "hidden"
                  }`}
                >
                  <DraftAudioPlayer
                    isPlayerVisible={isPlayerVisible}
                    isPlaying={isPlaying}
                    onPlayPause={handlePlayPause}
                    key={audioFile || ""}
                    beatUrl={audioFile || ""}
                  />
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleOpenTrackDetailsModal(
                      "Upload Untagged Audio",
                      ".mp3 or .wav",
                      ".mp3, .wav",
                      "beat"
                    );
                  }}
                  className=" px-4 py-2 text-blue-500 hover:bg-blue-800/40 active:outline active:outline-[6px] active:outline-blue-800/40 active:bg-blue-700 active:text-black bg-blue-800/20 font-medium rounded-full cursor-pointer"
                >
                  {audioFile ? (
                    <span className="flex justify-between items-center gap-[6px]">
                      <TbReplace className="font-bold" size={18} />
                      Replace
                    </span>
                  ) : (
                    "Upload"
                  )}
                </button>
                <TrackDetailsUploadModal {...modalData} />
              </div>
            </div>
          </div>
          <div>
            <div className="text-xl mb-2 font-semibold ">
              Upload Stems (Optional)
            </div>
            <div className="text-[13px] mb-4">
              Add a ZIP or RAR file containing your track stems, to provide
              additional licensing options for your clients. Your active
              licenses that include stem files, will automatically be enabled.
            </div>
            <div className="w-full flex flex-col sm:flex-row gap-4 sm:gap-0 justify-between items-center px-4 py-3 rounded-md border border-neutral-700/60">
              <div className="flex flex-col sm:flex-row gap-x-3 items-center">
                <div className="relative inline-block">
                  <div className="circular-border inset-0 absolute"></div>
                  <div className="z-10 w-[50px] h-[50px] flex justify-center items-center p-2 rounded-full">
                    <IoFolderOpenSharp className="text-neutral-400" size={23} />
                  </div>
                </div>
                <div className="w-full flex items-center sm:items-start flex-col justify-center">
                  <div className="text-lg font-medium ">Track Stems</div>
                  <p className="text-sm text-neutral-400">
                    Upload .zip or .rar files only
                  </p>
                </div>
              </div>
              <div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleOpenTrackDetailsModal(
                      "Upload Track Stems",
                      ".zip or .rar",
                      ".zip, .rar",
                      "stems"
                    );
                  }}
                  className=" px-4 py-2 text-blue-500 hover:bg-blue-800/40 active:outline active:outline-[6px] active:outline-blue-800/40 active:bg-blue-700 active:text-black bg-blue-800/20 font-medium rounded-full cursor-pointer"
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
          <div>
            <div className="text-sm text-neutral-500 mb-2">
              AUDIO FILES FOR STREAMING
            </div>
            <div className="text-xl mb-4 font-semibold ">Tagged file</div>
            <div className="w-full flex flex-col sm:flex-row gap-4 sm:gap-0 justify-between items-center px-4 py-3 rounded-md border border-neutral-700/60">
              <div className="flex flex-col sm:flex-row gap-x-3 items-center">
                <div className="relative inline-block">
                  <div className="circular-border inset-0 absolute"></div>
                  <div className="z-10 w-[50px] h-[50px] flex justify-center items-center p-2 rounded-full">
                    <IoMdMusicalNote className="text-neutral-400" size={30} />
                  </div>
                </div>
                <div className="w-full flex items-center sm:items-start flex-col justify-center">
                  <div className="text-lg font-medium ">Tagged audio</div>
                  <p className="text-sm text-neutral-400">
                    Upload .mp3 or .wav files only
                  </p>
                </div>
              </div>
              <div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleOpenTrackDetailsModal(
                      "Upload Tagged audio",
                      ".mp3 or .wav",
                      ".mp3, .wav",
                      "beat"
                    );
                  }}
                  className=" px-4 py-2 text-blue-500 hover:bg-blue-800/40 active:outline active:outline-[6px] active:outline-blue-800/40 active:bg-blue-700 active:text-black bg-blue-800/20 font-medium rounded-full cursor-pointer"
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
        </form>
        {coverArt && (
          <Image
            src={coverArt}
            className="absolute bottom-0 left-0 invisible"
            width={0}
            height={0}
            sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
            alt="cover-art"
          />
        )}
        <div className="flex justify-end my-2 pt-6 border-t border-neutral-700/50">
          <button
            onClick={() => {
              router.push("info");
            }}
            className="px-4 border hover:bg-neutral-700 active:outline active:outline-[6px] active:outline-neutral-800 border-neutral-700/50 py-1 rounded-md bg-neutral-800"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadBeat;
