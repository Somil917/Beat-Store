import AddToCartBtn from "@/components/AddToCartBtn";
import BeatBuyNowBtn from "@/components/BeatBuyNowBtn";
import LicenseUsageTerms from "@/components/LicenseUsageTerms";
import useGetLicensesByBeatId from "@/hooks/useGetLicensesByBeatId";
import { Beat, license } from "@/types";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

interface BeatLicensingProps {
  beat: Beat;
}

const BeatLicensing: React.FC<BeatLicensingProps> = ({ beat }) => {
  const { isLoading, licenses, fetchLicenses } = useGetLicensesByBeatId();
  const [selectedLicense, setSelectedLicense] = useState<any>();
  const pathname = usePathname();

  useEffect(() => {
    fetchLicenses(beat.id);
  }, [beat.id]);

  useEffect(() => {
    if (licenses && licenses.length > 0) {
      setSelectedLicense(licenses[0]);
    }
  }, [licenses]);

  return (
    <div className="md:bg-[#141414] flex flex-col gap-y-6 md:px-6 md:py-7 rounded-md w-full">
      <div className="w-full flex justify-between items-center">
        <div className="hidden md:block text-xl font-semibold">Licensing</div>
        <div className="flex w-full md:w-auto items-center justify-between gap-x-4">
          <div>
            <p className="text-neutral-400">Total:</p> ${selectedLicense?.price}
          </div>
          <div className="flex gap-x-4">
            <AddToCartBtn selectedLicense={selectedLicense!} beatId={beat.id} />
            <BeatBuyNowBtn selectedLicense={selectedLicense} beat={beat} />
          </div>
        </div>
      </div>
      <hr className="w-full hidden md:block border-0 h-[1.5px] bg-neutral-700/70" />
      <div className="overflow-y-auto grid 2xl:grid-cols-3 gap-5">
        {isLoading && !selectedLicense ? (
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
                  : "hover:bg-neutral-800 border-neutral-700/50"
              } justify-between items-center p-4 cursor-pointer border rounded-md mb-4`}
            >
              <div>
                <h2 className="text-lg font-semibold">{item.license_type}</h2>
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
      {selectedLicense && <LicenseUsageTerms license={selectedLicense} />}
    </div>
  );
};

export default BeatLicensing;
