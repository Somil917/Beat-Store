"use client";

import UserEdit from "@/components/UserEdit";
import { Beat, UserDetails } from "@/types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import AboutUser from "../components/AboutUser";
import UserBeats from "@/components/UserBeats";
import BeatCards from "@/components/BeatCards";

const UserChannel = () => {
  const [loading, setLoading] = useState(false);
  const [beats, setBeats] = useState<Beat[] | null>(null);
  const [user, setUser] = useState<UserDetails | undefined>(undefined);
  const supabaseClient = useSupabaseClient();
  const params = useParams();
  const slug = params.slug;
  const hasFetched = useRef(false); // Ref to ensure data fetch happens only once

  const fetchUserByDisplayName = async (display_name: string) => {
    try {
      const { data, error } = await supabaseClient
        .from("users")
        .select("*")
        .eq("display_name", display_name)
        .maybeSingle();

      if (error) {
        toast.error("Error fetching user: " + error.message);
        return null;
      }

      if (!data || data.length === 0) {
        toast.error("No user found with the given display name.");
        return null;
      }

      if (data.length > 1) {
        console.warn(
          "Multiple users found for the display name. Returning the first user.",
          data
        );
      }

      return Array.isArray(data)
        ? (data[0] as UserDetails)
        : (data as UserDetails); // Return the first user
    } catch (error) {
      console.error("Something went wrong while fetching user:", error);
      return null;
    }
  };

  const fetchBeatsById = async (user_id: string) => {
    try {
      setLoading(true);
      const { data: beats, error } = await supabaseClient
        .from("beats")
        .select("*, licenses(price)")
        .eq("user_id", user_id)
        .order("created_at", { ascending: false });

      if (error) {
        toast.error("Error fetching beats: " + error.message);
        return null;
      }

      return beats || [];
    } catch (error) {
      console.error("Something went wrong while fetching beats:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (hasFetched.current) return; // Prevent further API calls for the same slug
    hasFetched.current = true;

    const getBeats = async () => {
      const slugString = Array.isArray(slug) ? slug[0] : slug;

      if (!slugString) {
        console.error("Slug is undefined. Cannot fetch user or beats.");
        return;
      }

      const userDetails = await fetchUserByDisplayName(slugString);

      if (userDetails) {
        console.log("User fetched successfully:", userDetails);

        const data = await fetchBeatsById(userDetails.id);

        if (data) {
          console.log("Beats fetched successfully:", data);
          setUser(userDetails);
          setBeats(data);
        } else {
          console.error("Failed to fetch beats for user ID:", userDetails.id);
        }
      } else {
        console.error("User not found for slug:", slugString);
      }
    };

    getBeats();
  }, [slug, supabaseClient]);

  const showShimmer = () => {
    if (beats && beats?.length <= 8) {
      return beats?.length;
    } else {
      return 10;
    }
  };

  return (
    <div className="w-full min-h-screen mt-4 max-w-[1519px] m-auto bg-[#090909] p-4 md:px-20 flex flex-col md:flex-row justify-between py-28">
      <AboutUser user={user!} />
      {beats && (
        <div className=" min-h-[440px] md:w-[73%] w-full rounded-md">
          <div className="py-4 md:p-4 text-lg font-bold">Tracks</div>
          <BeatCards
            limit={showShimmer()}
            className1="mt-0 grid 2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3"
            className2="hidden"
            beats={beats}
          />
        </div>
      )}
    </div>
  );
};

export default UserChannel;
