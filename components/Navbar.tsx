"use client";

import useAuthModal from "@/hooks/useAuthModal";
import useUploadModal from "@/hooks/useUploadModal";
import { useUser } from "@/hooks/useUser";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { use, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { BiSearch } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { FiSearch } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import {
  IoIosArrowDown,
  IoIosLogOut,
  IoMdHeartEmpty,
  IoMdMenu,
} from "react-icons/io";
import { RiNotification3Line } from "react-icons/ri";
import SearchBox from "./SearchBox";
import { FaRegHeart } from "react-icons/fa";
import { LuHeart } from "react-icons/lu";
import qs from "query-string";
import Card from "./Card";
import { Beat } from "@/types";
import LikeCardItems from "./LikeCardItems";
import ProfileCardItems from "./ProfileCardItems";
import React from "react";
import useSubscribeModal from "@/hooks/useSubscribeModal";

// interface NavbarProps {
//   children: React.ReactNode;
// }

interface NavbarProps {
  beats: Beat[];
  href?: string;
}

const Navbar: React.FC<NavbarProps> = ({ href, beats }) => {
  const [value, setValue] = useState<string>("");
  const [isCard, setIsCard] = useState<boolean>(false);
  const [isProfileCard, setIsProfileCard] = useState<boolean>(false);

  const router = useRouter();

  const authModal = useAuthModal();

  const pathname = usePathname();

  const { user, subscription } = useUser();

  const uploadModal = useUploadModal();

  const subscribeModal = useSubscribeModal();

  const hideContentOnRoutes = [
    "/content/tracks/new/info",
    "/content/tracks/new/files",
    "/content/tracks/new/review",
    "/content/tracks/uploaded",
  ];

  const shouldNotShow = hideContentOnRoutes.includes(pathname);

  // handel upload
  const onClick = () => {
    if (!user) {
      return authModal.onOpen();
    }

    if (!subscription) {
      return subscribeModal.onOpen();
    }

    return uploadModal.onOpen();
  };

  const toggleCard = () => {
    setIsCard(!isCard);
  };
  const toggleProfileCard = () => {
    setIsProfileCard(!isProfileCard);
  };

  const handleSearch = () => {
    const query = { title: value };
    const url = qs.stringifyUrl({ url: "/search", query });
    router.push(url);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const query = { title: value };
      const url = qs.stringifyUrl({ url: "/search", query });
      router.push(url);
    }
  };

  useEffect(() => {
    setIsProfileCard(false);
    setIsCard(false);
  }, [pathname]);

  return (
    <div
      className="flex flex-col 
                bg-[#141414]
                
                border-b
              border-neutral-700/50
                w-full h-[65px] fixed top-0 left-0 z-20 "
    >
      <div
        className={`
                flex
                flex-row
                items-center
                justify-between
                max-w-[1519px]
                m-auto
                ${
                  shouldNotShow
                    ? "px-5"
                    : "px-4 md:px-10 lg:px-10 xl:px-20 2xl:px-20"
                }
                w-full
                py-3
        `}
      >
        <div className="flex items-center gap-x-2">
          {!shouldNotShow ? (
            <Link
              href="/"
              className="font-bold text-2xl md:text-2xl text-white cursor-pointer"
            >
              WAVESELL
            </Link>
          ) : (
            <div className="font-bold text-2xl text-white">STUDIO</div>
          )}
        </div>
        {!shouldNotShow && (
          <div
            className="
                    hidden
                    md:flex
                    items-center
                    gap-1.5
                    bg-neutral-700
                    px-2
                    md:w-[32%]
                    lg:w-[46%]
                    xl:w-[50%]
                    2xl:w-[50%]
                    py-2
                    border
                    border-solid
                    border-neutral-700
                    rounded-[4px]
                "
          >
            <FiSearch
              onClick={handleSearch}
              className="text-neutral-400 cursor-pointer"
            />
            <SearchBox
              placeholder="Search for Genres, Artists etc."
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
        )}
        {user ? (
          <>
            <div className="flex justify-between items-center 2xl:text-sm text-xs md:gap-x-1 gap-x-2.5 2xl:gap-3 text-neutral-400 font-medium">
              {!shouldNotShow && (
                <button
                  // href={"/content/tracks/new/files"}
                  onClick={onClick}
                  className="hidden md:block rounded-sm mr-1 lg:mr-4 xl:mr-4 2xl:mr-5 md:mr-4 font-bold px-3 py-1 text-gray-700 hover:text-gray-950 bg-slate-200 transition hover:bg-slate-100"
                >
                  Start Selling
                </button>
              )}
              <div className="relative">
                <button
                  className="flex justify-center items-center cursor-pointer gap-1 hover:bg-neutral-400/10 p-2 rounded-full"
                  onClick={toggleProfileCard}
                >
                  <CgProfile size={24} />
                  <IoIosArrowDown className="hidden lg:block 2xl:block" />
                </button>
                {isProfileCard && (
                  <Card
                    className={`${
                      !shouldNotShow
                        ? "right-[0px] top-[100%]"
                        : "right-[0px] top-[100%]"
                    } md:w-[180px] w-[140px] h-[300px] md:h-[360px] absolute`}
                  >
                    <ProfileCardItems />
                  </Card>
                )}
              </div>
              {!shouldNotShow && (
                <div className="relative">
                  <button
                    className=" hidden 2xl:flex lg:flex xl:flex justify-center items-center gap-1 hover:bg-neutral-400/10 p-2 rounded-full cursor-pointer"
                    onClick={toggleCard}
                  >
                    <LuHeart size={22} />
                    <IoIosArrowDown className="hidden lg:block 2xl:block" />
                  </button>
                  <Link
                    className="xl:hidden 2xl:hidden lg:hidden flex justify-center items-center gap-1 hover:bg-neutral-400/10 p-2 rounded-full cursor-pointer"
                    href="/liked"
                  >
                    <LuHeart size={22} />
                    <IoIosArrowDown className="hidden lg:block 2xl:block" />
                  </Link>
                  {isCard && (
                    <Card className="absolute top-[100%] right-0">
                      <LikeCardItems beats={beats} />
                    </Card>
                  )}
                </div>
              )}
              {!shouldNotShow && (
                <button className="flex justify-center items-center gap-1 hover:bg-neutral-400/10 p-2 rounded-full cursor-pointer">
                  <HiOutlineShoppingBag size={22} />
                  <IoIosArrowDown className="hidden lg:block 2xl:block" />
                </button>
              )}
              <button className="flex justify-center items-center gap-1 hover:bg-neutral-400/10 p-2 rounded-full cursor-pointer">
                <RiNotification3Line size={21} />
                <IoIosArrowDown className="hidden lg:block 2xl:block" />
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-between items-center text-sm gap-6 text-neutral-400 font-medium">
              <button
                onClick={authModal.onOpen}
                className="hover:text-neutral-300 transition"
              >
                SignUp
              </button>
              <span className=" after:content-['|']"></span>
              <button
                onClick={authModal.onOpen}
                className="hover:text-neutral-300 transition"
              >
                SignIn
              </button>
              <button
                onClick={authModal.onOpen}
                className="hidden md:block rounded-sm mx-3 font-bold px-3 py-1 text-gray-700 hover:text-gray-950 bg-slate-200 transition hover:bg-slate-100"
              >
                Sell Here
              </button>
              <HiOutlineShoppingBag
                size={22}
                className="md:text-3xl cursor-pointer"
              />
            </div>
          </>
        )}
      </div>
      <div className="w-full h-full bg-[#1E1E1D] md:bg-transparent px-3 flex items-center justify-center">
        {!shouldNotShow && (
          <div
            className="
                    md:hidden
                    flex
                    items-center
                    gap-1.5
                    bg-neutral-700
                    px-2
                    w-full
                    mt-1
                    py-2
                    border
                    border-solid
                    border-black
                    rounded-[4px]
                "
          >
            <FiSearch
              onClick={handleSearch}
              className="text-neutral-400 cursor-pointer"
            />
            <SearchBox
              className="w-full"
              placeholder="Search for Genres, Artists etc."
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
