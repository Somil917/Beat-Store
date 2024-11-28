"use client";

import useGetUserById from "@/hooks/useGetUserById";
import useLoadAvatarImage from "@/hooks/useLoadAvatarImage";
import { useUser } from "@/hooks/useUser";
import { postData } from "@/libs/helpers";
import { Product, ProductWithPrice, UserDetails } from "@/types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface UserEditProps {
  products: Product[];
}

const UserEdit: React.FC<UserEditProps> = ({ products }) => {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const { user, isLoading, subscription } = useUser();
  const { userDetails } = useGetUserById(user?.id);
  const avatar_url = useLoadAvatarImage(userDetails!);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user && !isLoading) {
      router.replace("/");
      return;
    }
  }, [user, router, isLoading]);

  const handleClick = () => {
    router.push("account/profile");
  };

  const redirectToCustomerPortal = async () => {
    setLoading(true);
    try {
      const { url, error } = await postData({
        url: "/api/create-portal-link",
      });
      window.location.assign(url);
    } catch (error) {
      toast.error((error as Error).message);
    }
    setLoading(false);
  };

  return (
    <div
      className="md:w-[330px] w-full md:h-[440px] p-4 flex flex-col gap-3
        drop-shadow-lg
        items-center md:bg-[#141414] rounded-md"
    >
      <div className="w-24 h-24 md:w-32 relative md:h-32 overflow-hidden border border-neutral-700 rounded-full ">
        <Image
          className="object-cover"
          fill
          src={avatar_url || "/images/UserProfile.jpg"}
          alt="profile"
        />
      </div>
      <div>
        <p className="text-2xl font-semibold">{userDetails?.display_name}</p>
      </div>
      <div
        onClick={handleClick}
        className="md:w-full w-[90%] cursor-pointer mt-1"
      >
        <button className="bg-neutral-800 hover:bg-neutral-600 rounded-md text-white font-bold p-2 w-full">
          Edit Profile
        </button>
      </div>
      <div className="hidden md:block w-full mt-3">
        <table className=" w-full">
          <tbody>
            <tr className="text-sm text-neutral-400">
              <td className="pb-4">Other Details</td>
            </tr>
            <tr className="text-base text-neutral-300">
              <td className="pb-2">Full Name</td>
              <td className="text-right pb-2">{userDetails?.full_name}</td>
            </tr>
            <tr className="text-base text-neutral-300">
              <td className="pb-2 align-top">Subscription</td>
              <td className="text-right pb-2">
                {!subscription && "NA"}
                {subscription && (
                  <div>
                    {products[0].name}
                    <button
                      onClick={redirectToCustomerPortal}
                      disabled={loading || isLoading}
                      className="py-1 px-3 bg-blue-600 mt-2 font-medium text-sm rounded-full"
                    >
                      Plan Details
                    </button>{" "}
                  </div>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserEdit;
