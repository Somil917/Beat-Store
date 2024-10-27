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
import { CgProfile } from "react-icons/cg";
import { FiSearch } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { IoIosArrowDown, IoIosLogOut, IoMdHeartEmpty } from "react-icons/io";
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

  const { user } = useUser();

  const uploadModal = useUploadModal();

  // handel upload
  const onClick = () => {
    if (!user) {
      return authModal.onOpen();
    }

    return uploadModal.onOpen();
  };

  // const onLikeClick = () => {
  //   router.push('/liked');
  // };
  // const routes = useMemo(
  //   () => [
  //     {
  //       label: "WAVESELL",
  //       active: pathname !== "/search",
  //       href: "/",
  //     },
  //     {
  //       icon: BiSearch,
  //       label: "Search",
  //       active: pathname === "/search",
  //       href: "/search",
  //     },
  //   ],
  //   [pathname]
  // );

  const toggleCard = () => {
    setIsCard(!isCard);
  };
  const toggleProfileCard = () => {
    setIsProfileCard(!isProfileCard);
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
    setIsCard(false)
    
  }, [pathname])

  return (
    <div className="flex w-full fixed top-0 left-0 z-10 border-b border-neutral-700/50">
      <div
        className="
                flex
                flex-row
                items-center
                justify-between
                px-28
                bg-[#141414]
                w-full
                py-3
            "
      >
        <div>
          <Link
            href="/"
            className="font-bold text-2xl text-white cursor-pointer"
          >
            WAVESELL
          </Link>
        </div>
        <div
          className="
                    flex
                    items-center
                    gap-1.5
                    bg-neutral-700
                    px-2
                    py-2
                    border
                    border-solid
                    border-black
                    rounded-[4px]
                "
        >
          <FiSearch className="text-neutral-400" />
          <SearchBox
            placeholder="Search for Genres, Artists etc."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        {user ? (
          <>
            <div className="flex justify-between items-center text-sm gap-3 text-neutral-400 font-medium">
              <button
                onClick={onClick}
                className="rounded-sm mr-5 font-bold px-3 py-1 text-gray-700 hover:text-gray-950 bg-slate-200 transition hover:bg-slate-100"
              >
                Start Selling
              </button>
              <button
                className="flex  justify-center items-center cursor-pointer gap-1 hover:bg-neutral-400/10 p-2 rounded-full"
                onClick={toggleProfileCard}
              >
                <CgProfile size={24} />
                <IoIosArrowDown />
              </button>
              {isProfileCard && (
                <Card className="right-[320px] w-[180px]">
                  <ProfileCardItems />
                </Card>
              )}
              <button
                className="flex justify-center items-center gap-1 hover:bg-neutral-400/10 p-2 rounded-full cursor-pointer"
                onClick={toggleCard}
              >
                <LuHeart size={22} />
                <IoIosArrowDown />
              </button>
              {isCard && (
                <Card className="right-[250px]">
                  <LikeCardItems beats={beats} />
                </Card>
              )}
              <button className="flex justify-center items-center gap-1 hover:bg-neutral-400/10 p-2 rounded-full cursor-pointer">
                <HiOutlineShoppingBag size={22} />
                <IoIosArrowDown />
              </button>
              <button className="flex  justify-center items-center gap-1 hover:bg-neutral-400/10 p-2 rounded-full cursor-pointer">
                <RiNotification3Line size={21} />
                <IoIosArrowDown />
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
                className="rounded-sm mx-3 font-bold px-3 py-1 text-gray-700 hover:text-gray-950 bg-slate-200 transition hover:bg-slate-100"
              >
                Sell Here
              </button>
              <HiOutlineShoppingBag className="text-3xl cursor-pointer" />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
