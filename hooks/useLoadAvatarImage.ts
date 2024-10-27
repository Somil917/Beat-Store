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

  const cacheBuster = `?v=${new Date().getTime()}`;
  const avatarUrlWithCacheBuster = imageData.publicUrl + cacheBuster;

  return avatarUrlWithCacheBuster;
};

export default useLoadAvatarImage;
