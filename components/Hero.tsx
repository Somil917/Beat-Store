"use client";

import localFont from "next/font/local";
import Image from "next/image";
import { GoArrowRight } from "react-icons/go";
import React from "react";
import { useRouter } from "next/navigation";

// interface HeroProps {
//   children: React.ReactNode;
// }

const myFont = localFont({ src: "../fonts/Oswald-Medium.ttf" });

const Hero = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push("/topcharts");
  };

  return (
    <>
      <div className="mt-28 py-20 px-32 bg-[#0e0e0d] relative overflow-hidden">
        <h1
          style={myFont.style}
          className=" z-50 text-9xl mb-16 font-extrabold font-sans uppercase"
        >
          Let&apos;s make <br /> a hit Record
        </h1>
        <div className="group inline-block text-xl font-semibold text-neutral-400 hover:text-neutral-300 transition">
          <button onClick={handleClick}>
            Explore{" "}
            <GoArrowRight className="inline-block group-hover:translate-x-1 transition" />
          </button>
        </div>
        <img
          src="../images/partynextdoor.jpeg"
          alt="image"
          className=" opacity-80 before:content-['']  before:absolute before:top-0 before:w-[100%] before:h-[100%] before:accent-emerald-950/60 absolute top-0 right-0 w-[50%]"
        />
      </div>
    </>
  );
};

export default Hero;
