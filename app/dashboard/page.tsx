import getBeatsById from "@/actions/getBeatsById";
import UserBeats from "@/components/UserBeats";
import UserEdit from "@/components/UserEdit"
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
            <div className="w-full bg-[#090909] items-start flex p-28  justify-center  gap-3">
            <UserEdit/>
            <UserBeats beats={data}/>
            </div>
        </>
     );
}
 
export default Dashboard;