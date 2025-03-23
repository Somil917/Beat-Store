import getLikedBeats from "@/actions/getLikedBeats";
import MediaItem from "@/components/MediaItem";
import LikedContent from "./components/LikedContent";
import Navbar from "@/components/Navbar";
import React from "react";

export const revalidate = 0;

const Liked = () => {

  return (
    <>
      {/* <Navbar href="liked" /> */}
      <LikedContent />
    </>
  );
};

export default Liked;
