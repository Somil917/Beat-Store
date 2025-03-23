"use client";

import React, { useState } from "react";
import Image from "next/image";
import useLoadImage from "@/hooks/useLoadImage";
import { RxCross2 } from "react-icons/rx";
import { useUser } from "@/hooks/useUser";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import useLoadAvatarImage from "@/hooks/useLoadAvatarImage";
import useGetUserById from "@/hooks/useGetUserById";
import { CgProfile } from "react-icons/cg";
import TrackItem from "./TrackItem";
import { Beat, license } from "@/types";

interface CheckoutItemProps {
  cartItem: any;
}

const CheckoutItem: React.FC<CheckoutItemProps> = ({ cartItem }) => {
  // console.log("cartItems", cartItem);
  // const { licenses, beats } = cartItem;

  const mergedTracks = cartItem.beats.map((beat: Beat) => {
    // Find the corresponding license for this beat
    const license: license = cartItem.licenses.find(
      (license: any) => license.beat_id === beat.id
    );

    const cartId = cartItem.id;

    // Merge beat and license properties
    return { ...beat, license, cartId };
  });

  const { userDetails } = useGetUserById(cartItem.user_id);
  const avatarUrl = useLoadAvatarImage(userDetails!);
  let totalPrice = 0;

  for (let index = 0; index < mergedTracks.length; index++) {
    totalPrice = totalPrice + cartItem.licenses[index].price;
  }

  // console.log("merged tracks", mergedTracks);

  return (
    <div className="mb-5">
      <div className="flex justify-between text-lg text-neutral-400 mb-5 items-center">
        <div className="flex gap-x-2  items-center">
          <div className="w-8 relative h-8 aspect-square rounded-full overflow-hidden">
            {avatarUrl ? (
              <Image
                src={avatarUrl!}
                fill
                className="object-cover absolute rounded-full"
                alt={cartItem.beats[0].author}
              />
            ) : (
              <CgProfile className="object-cover absolute w-full h-full" />
            )}
          </div>
          <div>{cartItem.beats[0].author}</div>
        </div>
        <div className="flex items-center">
          <div>
            {mergedTracks.length} {mergedTracks.length > 1 ? "Items" : "Item"}:{" "}
            ${totalPrice}
          </div>
        </div>
      </div>
      {mergedTracks.map((item: any) => (
        <TrackItem key={item.id} track={item} />
      ))}
      <hr className="w-full border-0 h-[1.5px] my-8 bg-neutral-700/50" />
    </div>
  );
};

export default CheckoutItem;
