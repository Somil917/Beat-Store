"use client";

import Button from "./Button";
import { useState } from "react";
import { useUser } from "@/hooks/useUser";
import toast from "react-hot-toast";
import { createProductAndPriceId, postData } from "@/libs/helpers";
import { getStripe } from "@/libs/stripeClient";
import { Beat } from "@/types";

interface BeatPurchaseBtnProps {
  beatId: string;
  beatPrice: number;
  beat: Beat;
}

const formatPrice = (beatPrice: number) => {
  const priceString = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "usd",
    minimumFractionDigits: 0,
  }).format(beatPrice || 0);

  return priceString;
};

const BeatPurchaseBtn: React.FC<BeatPurchaseBtnProps> = ({
  beatId,
  beatPrice,
  beat,
}) => {
  const { user, isLoading } = useUser();
  const [isCheckoutLoading, setIsCheckoutLoading] = useState<boolean>(false);

  const handleCheckout = async (beat: Beat, beatId: string) => {
    // const price = await createProductAndPriceId(beat);

    setIsCheckoutLoading(true);

    if (!user) {
      setIsCheckoutLoading(false);
      return toast.error("Must be logged in");
    }

    const purchaseType = "beat_purchase";

    try {
      const { sessionId } = await postData({
        url: "/api/create-checkout-session",
        data: { beat, purchaseType, metadata: { beatId } },
      });

      const stripe = await getStripe();
      stripe?.redirectToCheckout({ sessionId });
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setIsCheckoutLoading(false);
    }
  };

  return (
    <button
      onClick={() => handleCheckout(beat, beatId)}
      disabled={isLoading || isCheckoutLoading === true}
      className="py-2 h-full hover:bg-blue-950/60 w-full border border-blue-700 rounded-md"
    >
      {`${formatPrice(beatPrice)}`}
    </button>
  );
};

export default BeatPurchaseBtn;
