import { useUser } from "@/hooks/useUser";
import { postData } from "@/libs/helpers";
import { getStripe } from "@/libs/stripeClient";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { Beat } from "@/types";

interface BeatBuyNowBtnProps {
  selectedLicense: any;
  beat: Beat;
}

const BeatBuyNowBtn: React.FC<BeatBuyNowBtnProps> = ({
  selectedLicense,
  beat,
}) => {
  const { user } = useUser();

  const [isCheckoutLoading, setIsCheckoutLoading] = useState<boolean>(false);

  const selectedLicenseWithTitle = [{ ...selectedLicense, title: beat.title }];

  const handleCheckout = async (licensesWithTitle: any[]) => {
    setIsCheckoutLoading(true);

    if (!user) {
      setIsCheckoutLoading(false)
      return toast.error("Must be logged in");
    }

    if (!licensesWithTitle) {
      setIsCheckoutLoading(false)
      toast.error("License is not selected");
      return;
    }

    const purchaseType = "beat_purchase";

    try {
      const { sessionId } = await postData({
        url: "/api/create-checkout-session",
        data: {
          purchaseType,
          licenses: licensesWithTitle,
        },
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
      onClick={(e) => {
        e.preventDefault();
        handleCheckout(selectedLicenseWithTitle);
      }}
      className="px-4 w-28 active:outline active:outline-[6px] active:outline-blue-800 active:bg-blue-500 active:text-black py-2 rounded-md border border-neutral-700/50 bg-blue-600 hover:bg-blue-500/90 text-white"
    >
      {isCheckoutLoading ? (
        <Loader2 className="m-auto animate-spin" />
      ) : (
        "Buy now"
      )}
    </button>
  );
};

export default BeatBuyNowBtn;
