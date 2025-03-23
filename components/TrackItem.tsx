import useLoadImage from "@/hooks/useLoadImage";
import { useUser } from "@/hooks/useUser";
import { Beat } from "@/types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { RxCross2 } from "react-icons/rx";

interface TrackItemProps {
  track: any;
}

const TrackItem: React.FC<TrackItemProps> = ({ track }) => {
  const { user } = useUser();
  const supabase = useSupabaseClient();
  const router = useRouter();

  const imageUrl = useLoadImage(track);

  const onCancelClick = async (id: string) => {
    if (!user) {
      return;
    }

    if (!id) {
      return;
    }

    const { error } = await supabase
      .from("cart")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) {
      console.error(error);
    }

    router.refresh();
  };

  return (
    <div className="mb-7">
      <div
        className={`
            flex
            items-center
            gap-x-4
            rounded-md
            justify-between
            overflow-hidden
            `}
      >
        <div
          className="
            relative
            rounded-md
            aspect-square
            w-[100px]
            min-w-[48px]
            min-h-[48px]
            overflow-hidden
            md:border-none
            border
            border-neutral-700
            "
        >
          <Image
            className="object-cover select-none"
            fill
            src={imageUrl || "/../public/images/partynextdoor.jpeg"}
            alt={track.title}
          />
        </div>
        <div className="flex h-[80px]  flex-col justify-between items-start overflow-hidden pr-3  w-full text-white">
          <div className="w-full">
            <div className="flex justify-between w-full">
              <p className="font-bold text-xl pr-3 select-none truncate">
                {track.title}
              </p>
              <div>${track.license.price}</div>
            </div>
            <p className="text-base text-neutral-400 select-none w-full truncate">
              Track . {track.license.license_type}
            </p>
          </div>
          <a href="" className="text-blue-600">
            Review license
          </a>
        </div>
        <div className="flex h-[90px] items-center text-white">
          <button
            onClick={(e) => {
              e.preventDefault();
              onCancelClick(track.cartId);
            }}
            className="font-semibold text-neutral-400 text-2xl"
          >
            <RxCross2 />{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrackItem;
