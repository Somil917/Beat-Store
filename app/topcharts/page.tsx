import getBeats from "@/actions/getBeats";
import BeatCards from "@/components/BeatCards";
import Beatssection from "@/components/Beatssection";
import Navbar from "@/components/Navbar";
import React from "react";

const TopCharts = async () => {
    const beats = await getBeats();

    return ( 
        <>
            {/* <Navbar/> */}
            <div className="bg-[#141414] min-h-screen py-8 px-28 mt-14">
                <BeatCards className="2xl:grid-cols-5" beats={beats}/>
            </div>
        </>
     );
}
 
export default TopCharts;