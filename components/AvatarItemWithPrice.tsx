"use client";

import useGetUserById from "@/hooks/useGetUserById";
import useLoadAvatarImage from "@/hooks/useLoadAvatarImage";
import { Beat, license } from "@/types";
import Image from "next/image";
import React from "react";
import { CgProfile } from "react-icons/cg";

interface AvatarItemWithPriceProps {
  cartItem: any;
}

const AvatarItemWithPrice: React.FC<AvatarItemWithPriceProps> = ({
  cartItem,
}) => {
  const { userDetails } = useGetUserById(cartItem.user_id);
  const avatarUrl = useLoadAvatarImage(userDetails!);

  const mergedTracks = cartItem.beats.map((beat: Beat) => {
    // Find the corresponding license for this beat
    const license: license = cartItem.licenses.find(
      (license: any) => license.beat_id === beat.id
    );

    const cartId = cartItem.id;

    // Merge beat and license properties
    return { ...beat, license, cartId };
  });
  let totalPrice = 0;

  for (let index = 0; index < mergedTracks.length; index++) {
    totalPrice = totalPrice + cartItem.licenses[index].price;
  }

  return (
    <div className="flex justify-between text-base mb-5 items-center">
      <div className="flex gap-x-2  items-center">
        <div className="w-6 relative aspect-square rounded-full overflow-hidden">
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
      <div className="flex items-center"><div>${totalPrice}</div></div>
    </div>
  );
};

export default AvatarItemWithPrice;
