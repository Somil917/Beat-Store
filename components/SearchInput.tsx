"use client";

import { useEffect, useState } from "react";
import Input from "./Input";
import useDebounce from "@/hooks/useDebounce";
import { useRouter } from "next/navigation";
import qs from "query-string";
import SearchBox from "./SearchBox";
import { FiSearch } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { RiNotification3Line } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { IoIosLogOut } from "react-icons/io";
import Link from "next/link";
import useAuthModal from "@/hooks/useAuthModal";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import toast from "react-hot-toast";
import useUploadModal from "@/hooks/useUploadModal";

const SearchInput = () => {
  const [value, setValue] = useState<string>("");
  const debouncedValue = useDebounce<string>(value, 500);
  const router = useRouter();

  // useEffect(() => {
  //   const query = {
  //     title: value
  //   }

  //   const url = qs.stringifyUrl({
  //     url: '/search',
  //     query: query,
  //   })

  //   router.push(url)
  // }, [router, value])

  // const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   if(e.key === "Enter"){
  //     e.preventDefault();
  //     const query = { title: value }
  //     const url = qs.stringifyUrl({ url: '/search', query})
  //     router.push(url);
  //   }
  // }

  //Navbar with searchbox
  const authModal = useAuthModal();

  const supabaseClient = useSupabaseClient();

  const { user } = useUser();

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();

    router.refresh();
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Logged Out!");
    }
  };

  const uploadModal = useUploadModal();

  // handel upload
  const onClick = () => {
    if (!user) {
      return authModal.onOpen("sign_in");
    }

    return uploadModal.onOpen();
  };

  return (
    <div className="flex w-full">
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
          <SearchBox placeholder="Search for Genres, Artists etc." />
        </div>
        {user ? (
          <>
            <div className="flex justify-between items-center text-sm gap-6 text-neutral-400 font-medium">
              <button
                onClick={onClick}
                className="rounded-sm mx-3 font-bold px-3 py-1 text-gray-700 hover:text-gray-950 bg-slate-200 transition hover:bg-slate-100"
              >
                Start Selling
              </button>
              <CgProfile className="text-2xl cursor-pointer" />
              <RiNotification3Line className="text-2xl cursor-pointer" />
              <HiOutlineShoppingBag className="text-2xl cursor-pointer" />
              <button onClick={handleLogout}>
                <IoIosLogOut className="text-neutral-500 text-3xl ml-4 cursor-pointer" />
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-between items-center text-sm gap-6 text-neutral-400 font-medium">
              <button
                onClick={() => {
                  authModal.onOpen("sign_up");
                }}
                className="hover:text-neutral-300 transition"
              >
                SignUp
              </button>
              <span className=" after:content-['|']"></span>
              <button
                onClick={(e) => {
                  authModal.onOpen("sign_in");
                }}
                className="hover:text-neutral-300 transition"
              >
                SignIn
              </button>
              <button
                onClick={onClick}
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

export default SearchInput;
