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
      <div className="hidden md:block mt-28 lg:py-20 2xl:py-20 md:py-12 md:px-12 xl:px-24 lg:px-14 2xl:px-32 bg-[#0e0e0d] relative overflow-hidden">
        <h1
          style={myFont.style}
          className=" z-50 md:text-7xl lg:text-[92px] xl:text-8xl 2xl:text-9xl mb-16 font-extrabold font-sans uppercase"
        >
          Let&apos;s make <br /> a hit Record
        </h1>
        <div className="group inline-block md:text-lg lg:text-xl xl:text-xl 2xl:text-xl font-semibold text-neutral-400 hover:text-neutral-300 transition">
          <button onClick={handleClick}>
            Explore{" "}
            <GoArrowRight className="inline-block group-hover:translate-x-1 transition" />
          </button>
        </div>
        <img
          src="../images/partynextdoor.jpeg"
          alt="image"
          className="object-cover opacity-80 before:content-['']  before:absolute before:top-0 before:w-[100%] before:h-[100%] before:accent-emerald-950/60 absolute top-0 right-0 w-[50%]"
        />
      </div>
      <div className="md:hidden flex flex-col items-center mt-28 py-20 w-full bg-[#0e0e0d] relative overflow-hidden">
        <h1
          style={myFont.style}
          className=" text-4xl mb-2 font-extrabold font-sans uppercase"
        >
          Let&apos;s make a hit Record
        </h1>
        <div className="group text-xl flex justify-center font-semibold text-neutral-400 hover:text-neutral-300 transition">
          <button className="z-10" onClick={handleClick}>
            Explore{" "}
            <GoArrowRight className="inline-block group-hover:translate-x-1 transition" />
          </button>
        </div>
        <img
          src="../images/partynextdoor.jpeg"
          alt="image"
          className="absolute -z-0 opacity-20 before:content-['']  before:absolute before:top-0 before:w-[100%] before:h-[100%] before:accent-emerald-950/60 absolute inset-0"
        />
      </div>
    </>
  );
};

export default Hero;
