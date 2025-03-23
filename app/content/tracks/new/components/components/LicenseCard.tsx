import * as Switch from "@radix-ui/react-switch";
import { MdOutlineModeEdit } from "react-icons/md";

const LicenseCard = ({
  license,
  index,
  onSwitchStateChange,
  handlePriceChange,
}: any) => {
  return (
    <div className="w-full flex flex-col sm:flex-row gap-4 sm:gap-0 justify-between items-center px-4 py-3 rounded-md border border-neutral-700/60">
      <div className="flex flex-col sm:flex-row gap-x-3 items-center">
        <div className="relative inline-block">
          <div className="z-10 transition w-[50px] h-[50px] flex justify-center items-center rounded-full">
            <Switch.Root
              checked={license.isApplied}
              onCheckedChange={(checked) => onSwitchStateChange(checked, index)}
              id={`license-${index}`}
              className="w-11 h-6 bg-gray-300 rounded-full relative data-[state=checked]:bg-blue-500 transition-colors"
            >
              <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform translate-x-0.5 data-[state=checked]:translate-x-[22px]" />
            </Switch.Root>
          </div>
        </div>
        <div className="w-full flex items-center sm:items-start flex-col justify-center">
          <div className="text-lg font-medium">{license.license_type}</div>
          <p className="text-sm text-neutral-400">
            {license.license_type === "Basic License"
              ? "MP3"
              : license.license_type === "Premium License"
              ? "WAV, MP3"
              : "STEMS, WAV, MP3"}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <p className="text-sm text-neutral-100 font-medium">Price:</p>
        <div className="flex items-center gap-x-1 border border-neutral-700/60 px-2 py-1 bg-neutral-200 rounded-sm">
          <p className="text-md text-black font-medium">$</p>
          <input
            type="number"
            className="bg-transparent outline-none w-12 text-black"
            name="price"
            id="price"
            value={license.price}
            onChange={(e) => handlePriceChange(e, index)}
          />
        </div>
        <div className="text-sm md:text-base p-2 text-blue-500 hover:bg-blue-800/40 active:outline active:outline-[6px] active:outline-blue-800/40 active:bg-blue-700 active:text-black bg-blue-800/20 font-medium rounded-full cursor-pointer">
          <MdOutlineModeEdit />
        </div>
      </div>
    </div>
  );
};

export default LicenseCard;
