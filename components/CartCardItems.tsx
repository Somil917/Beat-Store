import { useUser } from "@/hooks/useUser";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import MediaItem from "./MediaItem";
import Link from "next/link";

import { RxCross2 } from "react-icons/rx";
import { useRouter } from "next/navigation";

interface CartCardItemsProps{
  cartItems: any[];
}

const CartCardItems: React.FC<CartCardItemsProps> = ({
  cartItems,
}) => {
  const router = useRouter();
  const { user } = useUser();
  const supabase = useSupabaseClient();
  const [cartTracksWithLicense, setCartTracksWithLicense] = useState<any[]>([]);
  const [isFetching, setIsFetching] = useState(false);

  // useEffect(() => {
  //   const fetchCartTracks = async () => {
  //     if (!user) {
  //       return;
  //     }

  //     try {
  //       setIsFetching(true);
  //       const { data, error } = await supabase
  //         .from("cart")
  //         .select("*, beats(*), licenses(*)")
  //         .eq("user_id", user.id)
  //         .order("created_at", { ascending: false });

  //       if (error) {
  //         console.error(error);
  //         return;
  //       }

  //       if (!data) {
  //         setIsFetching(false);
  //         console.log("No tracks in cart");
  //         return;
  //       }

  //       setCartTracksWithLicense(data);
  //     } catch (error) {
  //       console.log(error);
  //     } finally {
  //       setIsFetching(false);
  //     }
  //   };

  //   fetchCartTracks();
  // }, [supabase, user, cartTracksWithLicense]);

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
    <>
      {cartItems.length > 0 ? (
        <>
          <h2 className="text-xl px-3 mb-2">
            Your cart ({cartItems.length})
          </h2>
          <ul
            className="
            flex
            flex-col
            w-full
            "
          >
            {cartItems.map((item) => (
              <li
                className="flex justify-between items-center w-full pr-2 "
                key={item.id}
              >
                <MediaItem data={item.beats} />
                <div className="flex items-center justify-center gap-x-3">
                  <div className="font-semibold">${item.licenses.price}</div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      onCancelClick(item.id);
                    }}
                    className="font-semibold text-2xl"
                  >
                    <RxCross2 />{" "}
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <Link
            href="/cart-checkout"
            className="relative mx-2 text-center mt-2 bg-blue-600 hover:bg-blue-500 py-2 rounded-md"
          >
            <span className="absolute left-0 right-0 top-0 h-[0.2px] bg-neutral-800 -translate-y-2"></span>
            Checkout
          </Link>
        </>
      ) : isFetching ? (
        <p className="text-neutral-400 text-base m-auto">Loading..</p>
      ) : (
        <p className="text-neutral-400 text-base m-auto">No items</p>
      )}
    </>
  );
};

export default CartCardItems;
