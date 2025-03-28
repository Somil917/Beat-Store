"use client";

import BeatCards from "@/components/BeatCards";
import useGetPurchasedBeats from "@/hooks/useGetPurchasedBeats";
import { useUser } from "@/hooks/useUser";

const Purchased = () => {
  const { user } = useUser();
  const { purchasedBeats } = useGetPurchasedBeats(user?.id);

  const showShimmer = () => {
    if (purchasedBeats && purchasedBeats.length <= 10) {
      return purchasedBeats?.length;
    } else {
      return 10;
    }
  };

  return (
    <div
      className="
        min-h-screen
        bg-[#090909]
        2xl:py-16
        max-w-[1519px] 
        m-auto
        py-20
        px-5
        2xl:px-20
        md:px-10 
        lg:px-10 
        xl:px-20
        mt-14"
    >
      <h1 className="2xl:text-2xl mb-6 -m-1 md:m-0 text-3xl font-semibold">
        Purchased
      </h1>
      {purchasedBeats && purchasedBeats.length > 0 ? (
        <BeatCards
          limit={showShimmer()}
          className1="2xl:grid-cols-5 grid"
          className2="hidden"
          beats={purchasedBeats ? purchasedBeats : []}
        />
      ) : (
        <div className="mt-4">No purchased</div>
      )}
    </div>
  );
};

export default Purchased;
