"use client";

import { useState } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaSoundcloud,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { GoChevronDown } from "react-icons/go";

const Footer = () => {
  const [buttonStates, setButtonStates] = useState<{
    [key: string]: boolean;
  }>({
    button1: false,
    button2: false,
    button3: false,
  });

  const toggleDropDown = (buttonKey: string) => {
    setButtonStates((prevState) => ({
      ...prevState,
      [buttonKey]: !prevState[buttonKey],
    }));
  };

  return (
    <div
      className="
        bg-[#0e0e0d] py-8 md:px-28 px-11
        min-h-[50%]
        max-w-[1519px]
        m-auto
        "
    >
      <div
        className="
            hidden
            md:grid
            grid-cols-2
            sm:grid-cols-3
            md:grid-cols-4
            lg:grid-cols-4
            xl:grid-cols-4
            2xl:grid-cols-4
            gap-1
            mt-4
        "
      >
        <div
          className="
            flex
            justify-center
            items-start
            w-full
            "
        >
          <ul className="flex flex-col gap-y-2">
            <li className="font-semibold text-lg mb-2">WaveSell</li>
            <li className="text-neutral-400">About Us</li>
            <li className="text-neutral-400">Career</li>
            <li className="text-neutral-400">Blogs</li>
          </ul>
        </div>
        <div
          className="
            flex
            justify-center
            items-start
            w-full
            "
        >
          <ul className="flex flex-col gap-y-2">
            <li className="font-semibold text-lg mb-2">Support</li>
            <li className="text-neutral-400">Start Selling</li>
            <li className="text-neutral-400">Pricing</li>
            <li className="text-neutral-400">Sign up</li>
            <li className="text-neutral-400">Log in</li>
          </ul>
        </div>
        <div
          className="
            flex
            justify-center
            items-start
            w-full
            "
        >
          <ul className="flex flex-col gap-y-2">
            <li className="font-semibold text-lg mb-2">Press</li>
            <li className="text-neutral-400">Billboard</li>
            <li className="text-neutral-400">Vultures</li>
            <li className="text-neutral-400">Easter Eggs</li>
          </ul>
        </div>
        <div
          className="
            flex
            justify-center
            items-start
            w-full
            "
        >
          <ul className="flex flex-col gap-y-2">
            <li className="font-semibold text-lg mb-2">Social Media</li>
            <li className="text-neutral-400">YouTube</li>
            <li className="text-neutral-400">Instagram</li>
            <li className="text-neutral-400">Facebook</li>
            <li className="text-neutral-400">Twitter</li>
            <li className="text-neutral-400">SoundCloud</li>
          </ul>
        </div>
      </div>
      <div className="md:hidden w-full flex flex-col gap-y-10">
        <div className="space-y-4 w-full">
          <div
            onClick={() => toggleDropDown("button1")}
            className="flex w-full justify-between items-center font-semibold"
          >
            <h4>WaveSell</h4>
            <GoChevronDown
              className={`transition ${
                buttonStates.button1 ? "-rotate-180" : ""
              } `}
              size={20}
            />
          </div>
          {buttonStates.button1 && (
            <ul className="flex flex-col gap-y-2">
              <li className="text-neutral-400">About Us</li>
              <li className="text-neutral-400">Career</li>
              <li className="text-neutral-400">Blogs</li>
            </ul>
          )}
          <div
            onClick={() => toggleDropDown("button2")}
            className="flex w-full justify-between items-center font-semibold"
          >
            <h4>Support</h4>
            <GoChevronDown
              className={`transition ${
                buttonStates.button2 ? "-rotate-180" : ""
              } `}
              size={20}
            />
          </div>
          {buttonStates.button2 && (
            <ul className="flex flex-col gap-y-2">
              <li className="text-neutral-400">Start Selling</li>
              <li className="text-neutral-400">Pricing</li>
              <li className="text-neutral-400">Sign up</li>
              <li className="text-neutral-400">Log in</li>
            </ul>
          )}
          <div
            onClick={() => toggleDropDown("button3")}
            className="flex w-full justify-between items-center font-semibold"
          >
            <h4>Press</h4>
            <GoChevronDown
              className={`transition ${
                buttonStates.button3 ? "-rotate-180" : ""
              } `}
              size={20}
            />
          </div>
          {buttonStates.button3 && (
            <ul className="flex flex-col gap-y-2">
              <li className="text-neutral-400">Billboard</li>
              <li className="text-neutral-400">Vultures</li>
              <li className="text-neutral-400">Easter Eggs</li>
            </ul>
          )}
        </div>
        <div className="flex w-full justify-center gap-x-6 items-center">
          <a
            href="https://www.youtube.com/@somil2848"
            className="p-[10px] border border-neutral-700/50 rounded-sm"
          >
            <FaYoutube className="" size={20} />
          </a>
          <a
            href="https://www.instagram.com/som__ill/"
            className="p-[10px] border border-neutral-700/50 rounded-sm"
          >
            <FaInstagram className="" size={20} />
          </a>
          <div className="p-[10px] border border-neutral-700/50 rounded-sm">
            <FaFacebook className="" size={20} />
          </div>
          <a
            href="https://x.com/Somil56"
            className="p-[10px] border border-neutral-700/50 rounded-sm"
          >
            <FaTwitter className="" size={20} />
          </a>
          <a
            href="https://soundcloud.com/somil-290648821"
            className="p-[10px] border border-neutral-700/50 rounded-sm"
          >
            <FaSoundcloud className="" size={20} />
          </a>
        </div>
        <div className="flex font-medium text-neutral-400 justify-center items-center">
          <div>&copy; 2024 WaveSell, Inc.</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
