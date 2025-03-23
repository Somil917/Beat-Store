"use client";

import { Beat, license } from "@/types";
import PopUpModal from "./PopUpModal";
import usePopUpModal from "@/hooks/usePopUpModal";
import { IoCloseOutline } from "react-icons/io5";
import useGetLicensesByBeatId from "@/hooks/useGetLicensesByBeatId";
import { useEffect, useState } from "react";
import { useUser } from "@/hooks/useUser";
import { BsFillBagPlusFill } from "react-icons/bs";

import LicenseUsageTerms from "./LicenseUsageTerms";
import AddToCartBtn from "./AddToCartBtn";
import BeatBuyNowBtn from "./BeatBuyNowBtn";
import { useRouter } from "next/navigation";

interface BeatPurchaseBtnProps {
  beatId: string;
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

const BeatPurchaseBtn: React.FC<BeatPurchaseBtnProps> = ({ beatId, beat }) => {
  const { user } = useUser();
  const router = useRouter();

  const { isLoading, licenses, fetchLicenses } = useGetLicensesByBeatId();
  const { isOpen, onOpen, onClose } = usePopUpModal();

  const [selectedLicense, setSelectedLicense] = useState<license>();

  const beatTitleSlug = `${beat.title
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, "")
    .replace(/\s+/g, "-")}-${beat.id}`;

  const openBeat = () => {
    router.push(`/beat/${beatTitleSlug}`);
  };

  // console.log(selectedLicenseWithTitle)

  const handleOpenModal = async () => {
    onOpen(); // Open the modal
    await fetchLicenses(beatId);
  };

  useEffect(() => {
    if (licenses && licenses.length > 0) {
      setSelectedLicense(licenses[0]);
    }
  }, [licenses]);

  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault();
          openBeat();
        }}
        className="py-2 h-full font-semibold flex sm:hidden justify-center items-center gap-x-2 hover:bg-blue-950/60 w-full border border-blue-700 rounded-md"
      >
        <BsFillBagPlusFill />
        {`${formatPrice(beat?.licenses?.[0].price)}`}
      </button>
      <button
        onClick={async (e) => {
          e.preventDefault();
          setSelectedLicense(licenses[0]);
          handleOpenModal();
        }}
        className="py-2 h-full font-semibold hidden sm:flex justify-center items-center gap-x-2 hover:bg-blue-950/60 w-full border border-blue-700 rounded-md"
      >
        <BsFillBagPlusFill />
        {`${formatPrice(beat?.licenses?.[0].price)}`}
      </button>
      <PopUpModal isOpen={isOpen} onClose={onClose}>
        <div className="sm:w-[55%] w-[80%] relative flex flex-col gap-y-6 rounded-md pt-7 px-7 bg-[#141414]">
          <div className="flex justify-between items-center w-full">
            <h1 className="text-3xl font-semibold">Choose License</h1>
            <button
              aria-label="Close"
              className="m-0 p-0"
              onClick={(e) => {
                e.preventDefault();
                onClose(); // Close the modal
              }}
            >
              <IoCloseOutline size={46} />
            </button>
          </div>
          <div className="overflow-y-auto grid 2xl:grid-cols-3 gap-5">
            {isLoading ? (
              <>
                <div className="flex justify-between items-center h-28 rounded-md bg-neutral-800 shimmer"></div>
                <div className="flex justify-between items-center h-28 rounded-md bg-neutral-800 shimmer"></div>
                <div className="flex justify-between items-center h-28 rounded-md bg-neutral-800 shimmer"></div>
              </>
            ) : licenses?.length > 0 ? (
              licenses.map((item) => (
                <div
                  onClick={(e) => {
                    setSelectedLicense(item);
                  }}
                  key={item.id}
                  className={`flex ${
                    item.id === selectedLicense?.id
                      ? "bg-[#081C39] border-blue-600"
                      : "bg-neutral-800 border-neutral-700/50"
                  } justify-between items-center p-4 cursor-pointer border rounded-md mb-4`}
                >
                  <div>
                    <h2 className="text-lg font-semibold">
                      {item.license_type}
                    </h2>
                    <p className="text-base">${item.price}</p>
                    <p className="text-xs text-neutral-400">
                      {item.license_type === "Basic License"
                        ? "MP3"
                        : item.license_type === "Premium License"
                        ? "WAV, MP3"
                        : "STEMS, WAV, MP3"}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex justify-center items-center h-32">
                <p className="text-neutral-400">No licenses available.</p>
              </div>
            )}
          </div>
          {selectedLicense && (
            <div className="w-full overflow-hidden">
              <LicenseUsageTerms license={selectedLicense} />
            </div>
          )}
          <div className=" py-5  w-full">
            <hr className="w-full hidden mb-5 md:block border-0 h-[0.5px] bg-neutral-700/70" />
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs text-neutral-400">TOTAL:</p>
                <h2 className="text-lg font-semibold">
                  {selectedLicense?.price}
                </h2>
              </div>
              <div className="flex gap-x-4 items-center">
                <AddToCartBtn
                  onClose={onClose}
                  selectedLicense={selectedLicense!}
                  beatId={beatId}
                />
                <BeatBuyNowBtn selectedLicense={selectedLicense} beat={beat} />
              </div>
            </div>
          </div>
        </div>
      </PopUpModal>
    </>
  );
};

export default BeatPurchaseBtn;
