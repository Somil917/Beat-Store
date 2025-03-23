import getCartItems from "@/actions/getCartItems";
import AvatarItemWithPrice from "@/components/AvatarItemWithPrice";
import CartSummary from "@/components/CartSummary";
import CheckoutItem from "@/components/CheckoutItem";
import React from "react";

const Cartcheckout = async () => {
  const cartItems = await getCartItems();
  // console.log(cartItems)

  //group cartitems by userid
  const groupedCartItems: any[] = Object.values(
    cartItems.reduce((acc, item) => {
      if (!acc[item.beats.user_id]) {
        acc[item.beats.user_id] = {
          user_id: item.beats.user_id,
          id: item.id,
          beats: [],
          licenses: [],
        };
      }

      acc[item.beats.user_id].beats.push(item.beats);
      acc[item.beats.user_id].licenses.push(item.licenses);
      return acc;
    }, {})
  );

  // console.log(groupedCartItems)

  return (
    <div
      className="
        min-h-screen
        bg-[#090909]
        2xl:py-16
        py-20
        max-w-[1519px] 
        m-auto
        px-5
        2xl:px-20
        md:px-10 
        lg:px-10 
        xl:px-20
        mt-14"
    >
      <h1 className="2xl:text-3xl mb-4 2xl:mb-10 -m-1 md:m-0 text-3xl font-semibold">
        Cart
      </h1>
      <div className="flex pb-7 flex-col md:pb-0 sm:flex-row w-full gap-x-10">
        <div className="w-full">
          {groupedCartItems.map((item) => (
            <CheckoutItem key={item.id} cartItem={item} />
          ))}
        </div>
        <CartSummary groupedCartItems={groupedCartItems} cartItems={cartItems}>
          {groupedCartItems.map((item) => (
            <AvatarItemWithPrice key={item.id} cartItem={item} />
          ))}
        </CartSummary>
      </div>
    </div>
  );
};

export default Cartcheckout;
