import useAuthModal from "@/hooks/useAuthModal";
import usePopUpModal from "@/hooks/usePopUpModal";
import { useUser } from "@/hooks/useUser";
import { license } from "@/types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface AddToCartBtnProps {
  selectedLicense: license;
  beatId: string;
  onClose?: () => void;
}

const AddToCartBtn: React.FC<AddToCartBtnProps> = ({
  selectedLicense,
  beatId,
  onClose,
}) => {
  const supabase = useSupabaseClient();
  const { user } = useUser();
  const router = useRouter();
  const [isUploadingToCart, setIsUploadingToCart] = useState(false);
  const authModal = useAuthModal();

  const onClickAddToCart = async () => {
    if (!user) {
      if (onClose) {
        onClose();
      }
      return authModal.onOpen();
    }

    if (!selectedLicense) {
      toast.error("Select a license");
      return;
    }

    try {
      const { error: cartError } = await supabase.from("cart").upsert(
        {
          user_id: user?.id,
          beat_id: beatId,
          license_id: selectedLicense?.id,
        },
        { onConflict: "user_id, beat_id" }
      );

      if (cartError) {
        toast.error(cartError.message);
        return;
      }

      if (onClose) {
        onClose();
      }
      router.refresh();
    } catch (error) {
      console.log(error);
    } finally {
      setIsUploadingToCart(false);
    }
  };

  return (
    <button
      onClick={onClickAddToCart}
      disabled={isUploadingToCart}
      className="px-4 py-2 hover:bg-neutral-700 active:outline active:outline-[6px] active:outline-neutral-800 rounded-md border border-neutral-700/50 bg-neutral-800"
    >
      Add to cart
    </button>
  );
};

export default AddToCartBtn;
