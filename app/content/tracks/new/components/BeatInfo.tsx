"use client";

import Input from "@/components/Input";
import { useFormContext } from "@/providers/FormProvider";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import NavigateRoutes from "./NavigateRoutes";
import useTrackDetailsUpload from "@/hooks/useTrackDetailsUpload";
import TrackDetailsUploadModal from "@/components/TrackDetailsUploadModal";
import { useDraftStore } from "@/hooks/useDraftStore";
import { ClipLoader } from "react-spinners";
import { IoInformationCircleOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";

const BeatInfo = () => {
  const { formData, updateFormData } = useFormContext();
  const router = useRouter();
  const trackDetailsUploadModal = useTrackDetailsUpload();
  const { coverArt, isCoverFetching, isCoverLoading, setIsCoverLoading } =
    useDraftStore();

  // console.log(formData);

  const [tagInput, setTagInput] = useState<string>("");
  const [genreInput, setGenreInput] = useState<string>("");

  const [isMounted, setIsMounted] = useState(false);

  const keys = [
    "A♭m",
    "A♭M",
    "Am",
    "AM",
    "A♯m",
    "A♯M",
    "B♭m",
    "B♭M",
    "Bm",
    "BM",
    "Cm",
    "CM",
    "C♯m",
    "C♯M",
    "D♭m",
    "D♭M",
    "Dm",
    "DM",
    "D♯m",
    "D♯M",
    "E♭m",
    "E♭M",
    "Em",
    "EM",
    "Fm",
    "FM",
    "F♯m",
    "F♯M",
    "G♭m",
    "G♭M",
    "Gm",
    "GM",
    "G♯m",
    "G♯M",
    "None",
  ];

  useEffect(() => {
    setIsMounted(true);
    if (coverArt) {
      setIsCoverLoading(true);
    }

    return () => setIsCoverLoading(false);
  }, [coverArt, setIsCoverLoading]);

  const handleOpenTrackDetailsModal = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    trackDetailsUploadModal.onOpen();
  };

  const handleCoverArtChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files?.[0];

      updateFormData("beatinfo", { ...formData.beatinfo, coverArt: file });
    }
  };

  //get the select value in key variable
  const handleKeyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newKey = e.target.value;
    updateFormData("beatinfo", { ...formData.beatinfo, key: newKey });
  };

  //get the input value in tag variable
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };

  //add tag in the tag array on enter key press
  const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim() !== "") {
      e.preventDefault(); //prevent from default form submission
      if (formData.beatinfo.tags.length < 3) {
        const newTags = [...formData.beatinfo.tags, tagInput.trim()];

        updateFormData("beatinfo", { ...formData.beatinfo, tags: newTags });
      }

      setTagInput("");
    }
  };

  //remove the tag on clicking on the x btn
  const handleRemoveTag = (tag: string) => {
    const filteredTags = formData.beatinfo.tags.filter((t) => t !== tag);
    updateFormData("beatinfo", { ...formData.beatinfo, tags: filteredTags });
  };

  // get the input value in genreinput
  const handleGenreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGenreInput(e.target.value);
  };

  const handleGenreEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && genreInput.trim() !== "") {
      e.preventDefault(); //prevent from default form submission

      const newGenre = genreInput.trim().toLowerCase();

      if (
        !formData.beatinfo.genres.includes(newGenre) &&
        formData.beatinfo.genres.length < 3
      ) {
        const newGenres = [...formData.beatinfo.genres, newGenre];
        updateFormData("beatinfo", { ...formData.beatinfo, genres: newGenres });
      }

      setGenreInput("");
    }
  };
  // console.log(formData.beatinfo);

  //remove genre
  const handleRemoveGenre = (genre: string) => {
    const filteredGenres = formData.beatinfo.genres.filter((g) => g !== genre);
    updateFormData("beatinfo", {
      ...formData.beatinfo,
      genres: filteredGenres,
    });
  };

  const handleTextChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    updateFormData("beatinfo", { ...formData.beatinfo, [name]: value || "" });
  };

  return (
    <div className=" bg-[#141414] px-8 py-5 w-[50%] rounded-md border border-neutral-700/50">
      <div className="flex  w-full flex-col gap-y-6 h-full">
        <NavigateRoutes />
        <form className="w-full flex justify-center items-start gap-x-8">
          <div>
            <div className="overflow-hidden flex justify-center items-center relative border border-neutral-700/50 h-[200px] w-[200px] bg-neutral-700 rounded-md">
              {isCoverFetching ? (
                <div className=" h-[200px] w-[200px] flex justify-center items-center">
                  <ClipLoader size={50} color={"#3498db"} loading={true} />
                </div>
              ) : coverArt ? (
                <Image
                  fill
                  alt="cover-art"
                  sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                  src={coverArt}
                />
              ) : (
                <Image
                  fill
                  className="object-cover"
                  src="/images/partynextdoor.jpeg"
                  sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  alt="default"
                />
              )}
            </div>
            <div className="text-center mt-5">
              <button
                onClick={handleOpenTrackDetailsModal}
                className=" px-4 py-2 text-blue-500 hover:bg-blue-800/40 active:outline active:outline-[6px] active:outline-blue-800/40 active:bg-blue-700 active:text-black bg-blue-800/20 font-medium rounded-full cursor-pointer"
              >
                Upload CoverArt
              </button>
              <TrackDetailsUploadModal
                title="Upload Coverart"
                description=".jpeg, .jpg or .png"
                name="cover"
                accept=".jpeg, .jpg, .png"
              />
            </div>
          </div>
          <div className="w-full flex flex-col gap-y-6">
            <div>
              <div className="text-base mb-2 font-md">Title</div>
              <Input
                placeholder="Beat Title"
                id="title"
                name="title"
                aria-required
                onChange={handleTextChange}
                value={isMounted ? formData.beatinfo.title : ""}
              />
            </div>
            <div className="w-full flex justify-between gap-x-4 items-center">
              <div className="w-full ">
                <div className=" text-base mb-2 font-md">Key</div>
                <div className="relative">
                  <select
                    onChange={handleKeyChange}
                    value={isMounted ? formData.beatinfo.key || "" : ""}
                    name="key"
                    id="key"
                    className="
                    appearance-none
                    w-full 
                    bg-transparent
                    custom-shadow
                    border
                    border-neutral-700/80
                    rounded-md
                    px-3
                    py-3
                    text-sm
                    focus:outline-none
                    focus:border-blue-600
                    transition
                    "
                  >
                    <option value="" disabled hidden>
                      Select
                    </option>
                    {keys.map((key) => (
                      <option className="bg-[#141414]" value={key} key={key}>
                        {key}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <IoIosArrowDown size={17} />
                  </div>
                </div>
              </div>
              <div className="w-full">
                <div className="text-base mb-2 font-md">BPM</div>
                <Input
                  type="number"
                  className="appearance-none"
                  placeholder="BPM (for ex. 120)"
                  min="0"
                  max="300"
                  step="1"
                  id="bpm"
                  name="bpm"
                  onChange={handleTextChange}
                  value={isMounted ? formData.beatinfo.bpm || "" : ""}
                />
              </div>
            </div>
            <div className="w-full">
              <div className="text-base mb-2 font-md">Description</div>
              <textarea
                className="
                    w-full 
                    h-[150px]
                    resize-none 
                    rounded-md
                    bg-transparent
                    border
                    border-neutral-700/80
                    px-3
                    py-3
                    text-sm
                    file:border-0
                    file:bg-transparent
                    file:text-sm
                    file:font-medium
                    placeholder:text-neutral-400
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                    focus:outline-none
                    focus:border-blue-600
                    transition
                  "
                placeholder="Write the beat description"
                id="description"
                name="description"
                onChange={handleTextChange}
                value={isMounted ? formData.beatinfo.description || "" : ""}
              />
            </div>
            <div>
              <div className="text-base mb-2 font-md">Tags</div>
              <Input
                onChange={handleChange}
                onKeyDown={handleEnterPress}
                type="text"
                placeholder="Add Tags"
                id="tags"
                name="tags"
                value={isMounted ? tagInput : ""}
              />
              <div className="text-[13px] flex items-center gap-x-[2px] text-neutral-500 mt-1">
                <IoInformationCircleOutline className="inline-block" /> You can
                add up to 3 tags
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {isMounted ? (
                  formData.beatinfo.tags.map((tag: string, index: number) => (
                    <div
                      key={index}
                      className="bg-blue-800/30 whitespace-nowrap gap-x-1 flex justify-between items-center text-blue-500 font-semibold text-sm p-2 rounded-full"
                    >
                      {tag}
                      <span
                        onClick={() => handleRemoveTag(tag)}
                        className="w-full font-bold text-white cursor-pointer "
                      >
                        <AiOutlineClose size={13} />
                      </span>
                    </div>
                  ))
                ) : (
                  <div></div>
                )}
              </div>
            </div>
            <div>
              <div className="text-base mb-2 font-md">Genre</div>
              <Input
                onChange={handleGenreChange}
                onKeyDown={handleGenreEnterPress}
                type="text"
                placeholder="Add Genre"
                id="genre"
                name="genre"
                value={isMounted ? genreInput : ""}
              />
              <div className="text-[13px] flex items-center gap-x-[2px] text-neutral-500 mt-1">
                <IoInformationCircleOutline className="inline-block" /> You can
                add up to 3 Genres
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {isMounted ? (
                  formData.beatinfo.genres.map(
                    (genre: string, index: number) => (
                      <div
                        key={index}
                        className="bg-blue-800/30 whitespace-nowrap gap-x-1 flex justify-between items-center text-blue-500 font-semibold text-sm p-2 rounded-full"
                      >
                        {genre}
                        <span
                          onClick={() => handleRemoveGenre(genre)}
                          className="w-full font-bold text-white cursor-pointer "
                        >
                          <AiOutlineClose size={13} />
                        </span>
                      </div>
                    )
                  )
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </div>
        </form>
        <div className="flex justify-end my-2 pt-6 border-t border-neutral-700/50 ">
          <button
            onClick={() => {
              router.replace("files");
            }}
            className="px-4 hover:bg-neutral-700 active:outline active:outline-[6px] active:outline-neutral-800 py-1 rounded-md border border-neutral-700/50 mr-4 bg-neutral-800"
          >
            Back
          </button>
          <button
            onClick={() => {
              router.replace("review");
            }}
            className="px-4 hover:bg-neutral-700 active:outline active:outline-[6px] active:outline-neutral-800 py-1 rounded-md border border-neutral-700/50 bg-neutral-800"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default BeatInfo;
