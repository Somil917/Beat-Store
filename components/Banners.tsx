"use client";

import Image from "next/image";

const Banners = () => {
  return (
    <div className="relative">
      <Image
        src="/images/overlay.png"
        className="object-cover w-full h-full z-0 opacity-20 pointer-events-none"
        fill
        alt="overlay"
        priority
        quality={75}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-0 pointer-events-none" />
      <div
        className="
        py-10
        px-6
        md:py-20
        md:px-12
        lg:px-14
        xl:px-24
        2xl:px-32 
        overflow-hidden
        relative
        "
      >
        <div
          className="
        text-3xl
        md:text-4xl
        w-full
        md:w-[50%]
        leading-snug
        font-medium
        "
        >
          Get the best music selling service out there
        </div>
        <div
          className="
        mt-5
        text-sm
        md:mt-10
        md:text-lg
        md:w-[50%]
        leading-loose
        "
        >
          The best experice, seemless transactions and pay outs with no hassle
          with feasable track uploads and functionalities. Take the best bid by
          choosing WAVESELL. Start today and upload your first beat.
        </div>
        <div className="w-full flex cursor-pointer justify-center md:justify-start items-center mt-10 ">
          <button className="w-full md:w-32 font-semibold rounded-md py-3 bg-blue-600 hover:bg-blue-500/90">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banners;
