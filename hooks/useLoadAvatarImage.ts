import { Beat, UserDetails } from "@/types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const useLoadAvatarImage = (userDetails: UserDetails) => {
  const supabaseClient = useSupabaseClient();

  if (!userDetails?.avatar_url) {
    return null;
  }

  const { data: imageData } = supabaseClient.storage
    .from("images")
    .getPublicUrl(userDetails.avatar_url);


  // commented this cache buster part but it can be a cause you want to fix so try to uncomment and check
  // const cacheBuster = `?v=${new Date().getTime()}`;
  // const avatarUrlWithCacheBuster = imageData.publicUrl + cacheBuster;

  return imageData.publicUrl;
};

export default useLoadAvatarImage;
