import { UserDetails } from "@/types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { CgProfile } from "react-icons/cg";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { IoIosLogOut } from "react-icons/io";
import { MdMusicNote, MdOutlineMusicNote } from "react-icons/md";
import { PiVinylRecordLight } from "react-icons/pi";

interface ProfileCardItemsProps {
  userDetails: UserDetails;
  avatarUrl: string;
}

const ProfileCardItems: React.FC<ProfileCardItemsProps> = ({
  userDetails,
  avatarUrl,
}) => {
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
          <button className="w-6 h-6 overflow-hidden rounded-full relative aspect-square">
            {avatarUrl ? (
              <Image
                fill
                alt={"UserAvatarImg"}
                src={avatarUrl}
                className="object-cover absolute "
              />
            ) : (
              <CgProfile size={23} />
            )}
          </button>
          {userDetails.display_name}
        </Link>
        <hr className="w-full border-0 h-[1.5px] bg-neutral-700/60" />
        <Link
          href="/purchased"
          className="w-full cursor-pointer px-2 py-1 hover:bg-neutral-400/10 rounded-md flex justify-start items-center gap-2"
        >
          <button>
            <HiOutlineShoppingBag size={23} />
          </button>
          Purchased
        </Link>
        <Link
          href="/content/tracks/uploaded"
          className="w-full cursor-pointer px-2 py-1 hover:bg-neutral-400/10 rounded-md flex justify-start items-center gap-2"
        >
          <button>
            <PiVinylRecordLight size={23} />
          </button>
          All Uploads
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
