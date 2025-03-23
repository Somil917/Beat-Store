import { license } from "@/types";
import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { AnimatePresence, motion } from "framer-motion";
import { CiStreamOn } from "react-icons/ci";
import { BiLayer } from "react-icons/bi";
import { MdOutlineMusicVideo } from "react-icons/md";
import { PiDownloadSimpleBold } from "react-icons/pi";

interface LicenseUsageTermsProps {
  license: any;
}

const LicenseUsageTerms: React.FC<LicenseUsageTermsProps> = ({ license }) => {
  const [isUsageTermsOpen, setIsUsageTermsOpen] = useState<boolean>(false);

  return (
    <>
      <div>
        <hr className="w-full mb-5 md:block border-0 h-[0.5px] bg-neutral-700/70" />
        <div
          onClick={() => {
            setIsUsageTermsOpen((prev) => !prev);
          }}
          className="w-full cursor-pointer flex justify-between items-center"
        >
          <div className=" text-xl font-semibold">Usage Terms</div>
          <IoIosArrowDown
            className={`transition ${
              isUsageTermsOpen ? "-rotate-180" : "rotate-0"
            }`}
            size={23}
          />
        </div>
        <AnimatePresence>
          {isUsageTermsOpen && (
            <motion.div
              initial={{ maxHeight: 0 }}
              animate={{ maxHeight: 700 }}
              exit={{ maxHeight: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="mt-5 font-medium">{`${license.license_type} ($${license.price})`}</div>
              <div className="mt-10 flex w-full flex-wrap gap-y-7 gap-x-24 items-center uppercase text-xs text-neutral-400">
                <p className="flex items-center gap-x-4">
                  <BiLayer className="rotate-90" size={22} /> Distribute up to{" "}
                  {license.policies.NumberOfDistributionCopiesAllowed} copies
                </p>
                <p className="flex items-center gap-x-4">
                  <CiStreamOn size={22} />
                  {license.policies.NumberOfAudioStreamsAllowed} online audio
                  streams
                </p>
                <p className="flex items-center gap-x-4">
                  <MdOutlineMusicVideo size={22} />
                  {license.policies.NumberOfVideoStreamsAllowed} online video
                  streams
                </p>
                <p className="flex items-center gap-x-4">
                  <PiDownloadSimpleBold size={22} />
                  {license.policies.NumberOfAudioDownloadsAllowed} audio
                  downloads
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default LicenseUsageTerms;
