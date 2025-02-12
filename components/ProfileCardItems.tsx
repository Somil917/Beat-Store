import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { CgProfile } from "react-icons/cg";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { IoIosLogOut } from "react-icons/io";

const ProfileCardItems = () => {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();

    router.refresh();
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Logged Out!");
      router.refresh();
    }
  };

  const onProfileClick = () => {
    router.push("/dashboard");
  };

  return (
    <div className="flex p-1 justify-start items-center w-full">
      <ul className="w-full flex flex-col items-start gap-2">
        <Link
          href="/dashboard"
          className="w-full cursor-pointer px-2 py-1 hover:bg-neutral-400/10 rounded-md flex justify-start items-center gap-2"
        >
          <button>
            <CgProfile size={23} />
          </button>
          Profile
        </Link>
        <Link
          href="/purchased"
          className="w-full cursor-pointer px-2 py-1 hover:bg-neutral-400/10 rounded-md flex justify-start items-center gap-2"
        >
          <button>
            <HiOutlineShoppingBag size={23} />
          </button>
          Purchased
        </Link>
        <li
          onClick={handleLogout}
          className="w-full cursor-pointer px-2 py-1 hover:bg-neutral-400/10 rounded-md flex justify-start items-center gap-2"
        >
          <button>
            <IoIosLogOut className="text-white text-2xl cursor-pointer" />
          </button>
          Log Out
        </li>
      </ul>
    </div>
  );
};

export default ProfileCardItems;
