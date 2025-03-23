"use client";

import { useUser } from "@/hooks/useUser";
import { postData } from "@/libs/helpers";
import { getStripe } from "@/libs/stripeClient";
import { Beat, license } from "@/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CgProfile } from "react-icons/cg";

import { Loader2 } from "lucide-react";

interface CartSummaryProps {
  cartItems: any[];
  groupedCartItems: any[];
  children?: React.ReactNode;
}

const CartSummary: React.FC<CartSummaryProps> = ({
  cartItems,
  groupedCartItems,
  children,
}) => {
  const [shimmerLoading, setShimmerLoading] = useState(true);
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
  // console.log(groupedCartItems);
  const { user } = useUser();

  let length = cartItems.length;

  let total: number = 0;

  // console.log(groupedCartItems);

  for (let index = 0; index < length; index++) {
    total = total + cartItems[index].licenses.price;
  }

  const licensesWithTitles = groupedCartItems.flatMap((item) =>
    item.licenses.map((license: license) => {
      const beat = item.beats.find((b: Beat) => b.id === license.beat_id);

      return {
        ...license,
        title: beat ? beat.title : "Unknown Beat",
      };
    })
  );

  // console.log(licensesWithTitles);

  // console.log(licenses)

  useEffect(() => {
    setTimeout(() => {
      setShimmerLoading(false);
    }, 1000);
  });

  const handleOnCheckout = async (licenses: any[]) => {
    setIsCheckoutLoading(true);
    if (!user) {
      return;
    }

    if (!licenses || licenses.length === 0) {
      alert("No licenses selected");
      return;
    }

    const purchaseType = "beat_purchase";

    try {
      const { sessionId } = await postData({
        url: "/api/create-checkout-session",
        data: {
          purchaseType,
          licenses,
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
    <div
      className="md:w-[45%] w-full md:h-fit md:p-6 flex flex-col gap-3
                drop-shadow-lg
                items-center md:bg-[#141414] rounded-md"
    >
      <div className="w-full ">
        <div className="hidden md:block">
          {shimmerLoading ? (
            <div className="w-[100px] h-[24px] rounded-md shimmer"></div>
          ) : (
            <p className="text-2xl mb-6 font-semibold">Cart</p>
          )}
        </div>
        {children}
        <hr className="w-full border-0 h-[1.5px] my-3 bg-neutral-700/50" />
        <table className=" w-full">
          <tbody>
            <tr className="text-sm text-neutral-400">
              <td className="pb-3">
                {shimmerLoading ? (
                  <div className="w-[100px] shimmer h-[19px] rounded-full"></div>
                ) : (
                  "Subtotal"
                )}
              </td>
              <td className="text-right pb-3">
                {shimmerLoading ? (
                  <div className="w-[100px] shimmer h-[17px] rounded-full"></div>
                ) : (
                  <div>${total}</div>
                )}
              </td>
            </tr>
            <tr className="text-lg text-white">
              <td className="pb-3 align-top">
                {shimmerLoading ? (
                  <div className="w-[100px] shimmer h-[17px] rounded-full"></div>
                ) : (
                  `Total (${cartItems.length} ${
                    cartItems.length > 1 ? "items" : "item"
                  })`
                )}
              </td>
              <td className="text-right pb-3">
                {shimmerLoading ? (
                  <div className="w-[100px] shimmer h-[17px] rounded-full"></div>
                ) : (
                  `$${total}`
                )}
              </td>
            </tr>
          </tbody>
        </table>
        <div className="w-full mx-auto cursor-pointer mt-1 mb-3">
          {shimmerLoading ? (
            <div className="w-full h-[34px] rounded-md shimmer"></div>
          ) : (
            <button
              disabled={isCheckoutLoading}
              onClick={(e) => {
                e.preventDefault();
                handleOnCheckout(licensesWithTitles);
              }}
              className="bg-blue-600 hover:bg-blue-500 rounded-md  text-white font-bold p-3 w-full"
            >
              {isCheckoutLoading ? (
                <Loader2 className=" h-6 text-center animate-spin w-full" />
              ) : (
                "Proceed to Checkout"
              )}
            </button>
          )}
        </div>
        <p className="text-center text-[15px] text-neutral-400">
          By clicking the “Proceed to Checkout” button, you <br /> agree to our
          <span className="text-blue-500 cursor-pointer hover:text-blue-400 underline">
            {" "}
            Refund Policy
          </span>{" "}
          and the <br />{" "}
          <span className="text-blue-500 cursor-pointer hover:text-blue-400 underline ">
            {" "}
            WaveSell Terms of Service.
          </span>
        </p>
      </div>
    </div>
  );
};

export default CartSummary;
