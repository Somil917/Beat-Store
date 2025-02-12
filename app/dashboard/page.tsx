import getBeatsById from "@/actions/getBeatsById";
import UserBeats from "@/components/UserBeats";
import UserEdit from "@/components/UserEdit";
import UserEditWrapper from "@/components/UserEditWrapper";
import useGetSongById from "@/hooks/useGetSongById";
import useGetUserById from "@/hooks/useGetUserById";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import NextTopLoader from "nextjs-toploader";
import React from "react";

export const revalidate = 0;

const Dashboard = async () => {
  const data = await getBeatsById();

  return (
    <>
      <div className="hidden md:flex w-full bg-[#090909] items-start md:p-10 md:py-28 xl:py-28 xl:px-20 justify-between gap-3">
        <UserEditWrapper />
        <UserBeats beats={data} />
      </div>
      <div className="flex flex-col md:hidden min-h-screen py-32 w-full bg-[#090909] items-start md:p-10 md:py-28 xl:p-28  justify-center  gap-3">
        <UserEditWrapper />
        <UserBeats beats={data} />
      </div>
    </>
  );
};

export default Dashboard;
