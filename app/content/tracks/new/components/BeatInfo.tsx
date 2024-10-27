"use client";

import Input from "@/components/Input";
import { useFormContext } from "@/providers/FormProvider";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react"; // Import required styles
import { AiOutlineClose } from "react-icons/ai";
import { IoIosClose, IoMdClose } from "react-icons/io";
import { IoCloseCircleSharp } from "react-icons/io5";
import NavigateRoutes from "./NavigateRoutes";

const BeatInfo = () => {
  const { formData, updateFormData } = useFormContext();
  const router = useRouter();

  // console.log(formData);

  const [tagInput, setTagInput] = useState<string>("");
  const [genreInput, setGenreInput] = useState<string>("");

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Save formData to localStorage whenever it changes
  // useEffect(() => {
  //   if (formData.beatinfo) {
  //     localStorage.setItem("beatinfo", JSON.stringify(formData.beatinfo));
  //     console.log("Data saved to localStorage:", formData.beatinfo);
  //   }
  // }, [formData.beatinfo]);

  // useEffect(() => {
  //   const storedBeatInfo = localStorage.getItem("beatinfo");
  //   if (storedBeatInfo) {
  //     const parsedBeatInfo = JSON.parse(storedBeatInfo);
  //     if (
  //       JSON.stringify(parsedBeatInfo) !== JSON.stringify(formData.beatinfo)
  //     ) {
  //       updateFormData("beatinfo", parsedBeatInfo);
  //     }
  //   }
  // }, [updateFormData, formData.beatinfo]);

  const handleCoverArtChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files?.[0];

      updateFormData("beatinfo", { ...formData.beatinfo, coverArt: file });
    }
  };

  //get the input value in tag variable
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };

  //add tag in the tag array on enter key press
  const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim() !== "") {
      e.preventDefault(); //prevent from default form submission
      const newTags = [...formData.beatinfo.tags, tagInput.trim()];

      updateFormData("beatinfo", { ...formData.beatinfo, tags: newTags });

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

      if (!formData.beatinfo.genres.includes(newGenre)) {
        const newGenres = [...formData.beatinfo.genres, newGenre];
        updateFormData("beatinfo", { ...formData.beatinfo, genres: newGenres });
      }

      setGenreInput("");
    }
  };

  console.log(formData.beatinfo);

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
      <div className="flex w-full flex-col gap-y-6 h-full">
        <NavigateRoutes />
        <form className="w-full flex justify-center items-start gap-x-8">
          <div className="">
            <div className="overflow-hidden flex justify-center items-center relative border border-neutral-700/50 h-[200px] w-[200px] bg-neutral-700 rounded-md">
              <Image
                fill
                alt="cover-art"
                className="object-cover"
                src={
                  formData.beatinfo.coverArt instanceof File
                    ? URL.createObjectURL(formData.beatinfo.coverArt)
                    : "/images/partynextdoor.jpeg"
                }
              />
            </div>
            <div className="text-center mt-6">
              <Input
                onChange={handleCoverArtChange}
                id="cover-art"
                accept="image/*"
                type="file"
                className="sr-only hidden"
              />
              <label
                htmlFor="cover-art"
                className="w-full h-full px-4 py-2 text-blue-500 bg-blue-800/20 font-medium cursor-pointer"
              >
                Upload Cover Art
              </label>
            </div>
          </div>
          <div className="w-full flex flex-col gap-y-6">
            <div>
              <div className="text-base mb-2 font-md">Title</div>
              <Input
                placeholder="Beat Title"
                id="title"
                name="title"
                onChange={handleTextChange}
                value={isMounted ? formData.beatinfo.title || "" : ""}
              />
            </div>
            <div className="w-full flex justify-between gap-x-4 items-center">
              <div className="w-full">
                <div className="text-base mb-2 font-md">Key</div>
                <Input
                  placeholder="Key (for ex. C#m)"
                  id="key"
                  name="key"
                  onChange={handleTextChange}
                  value={isMounted ? formData.beatinfo.key || "" : ""}
                />
              </div>
              <div className="w-full">
                <div className="text-base mb-2 font-md">BPM</div>
                <Input
                  type="number"
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
                    bg-neutral-700
                    border
                    border-transparent
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
        <div className="flex justify-end mt-2 ">
          <button
            onClick={() => {
              router.replace("files");
            }}
            className="px-4 py-1 rounded-md border border-neutral-700/50 mr-4 bg-neutral-800"
          >
            Back
          </button>
          <button
            onClick={() => {
              router.replace("review");
            }}
            className="px-4 py-1 rounded-md border border-neutral-700/50 bg-neutral-800"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default BeatInfo;
