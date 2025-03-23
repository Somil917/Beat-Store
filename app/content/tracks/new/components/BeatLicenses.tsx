"use client";

import NavigateRoutes from "./NavigateRoutes";
import { useRouter } from "next/navigation";
import { useFormContext } from "@/providers/FormProvider";
import { ChangeEvent } from "react";
import LicenseCard from "./components/LicenseCard";
import useProtectUploadRoute from "@/hooks/useProtectUploadRoute";

const BeatLicenses = () => {
  useProtectUploadRoute();
  const router = useRouter();
  const { formData, updateFormData } = useFormContext();

  const onSwitchStateChange = (checked: boolean, index: number) => {
    const updatedPricing = formData.pricing.map((license, i) =>
      i === index ? { ...license, isApplied: checked } : license
    );
    updateFormData("pricing", updatedPricing);
  };

  const handlePriceChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target;
    const updatedPricing = formData.pricing.map((license, i) =>
      i === index ? { ...license, price: Number(value) } : license
    );
    updateFormData("pricing", updatedPricing);
  };

  return (
    <div className=" bg-[#141414] max-w-[1519px] mx-auto px-8 py-5 2xl:w-[50%] xl:w-[55%] lg:w-[60%] md:w-[80%] w-[90%] rounded-md border border-neutral-700/50">
      <div className="flex  w-full flex-col gap-y-6 h-full">
        <NavigateRoutes />
        <h2 className="text-xl font-bold text-white mb-2">Choose licenses</h2>
        {formData.pricing.map((license, index) => (
          <LicenseCard
            key={index}
            license={license}
            index={index}
            onSwitchStateChange={onSwitchStateChange}
            handlePriceChange={handlePriceChange}
          />
        ))}
        <div className="flex justify-end my-2 pt-6 border-t border-neutral-700/50 ">
          <button
            onClick={() => {
              router.replace("info");
            }}
            className="px-4 hover:bg-neutral-700 active:outline active:outline-[6px] active:outline-neutral-800 py-1 rounded-md border border-neutral-700/50 mr-4 bg-neutral-800"
          >
            Back
          </button>
          <button
            onClick={() => {
              router.replace("review");
            }}
            className="px-4 hover:bg-neutral-700 active:outline active:outline-[6px] active:outline-neutral-800 py-1 rounded-md border border-neutral-700/50 bg-neutral-800"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default BeatLicenses;
