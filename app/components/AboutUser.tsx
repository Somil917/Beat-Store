import useLoadAvatarImage from '@/hooks/useLoadAvatarImage';
import { UserDetails } from '@/types'
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

interface AboutUserProps {
    user: UserDetails;
}

const AboutUser: React.FC<AboutUserProps> = ({ user }) => {

    const [shimmerLoading, setShimmerLoading] = useState(true);
    const avatar = useLoadAvatarImage(user);

  useEffect(() => {
    setTimeout(() => {
      setShimmerLoading(false);
    }, 1000);
  });

  return (
    <div
      className="md:w-[25%] w-full md:h-[440px] p-4 flex flex-col gap-3
        drop-shadow-lg
        items-center md:bg-[#141414] rounded-md"
    >
      <div className="w-24 h-24 md:w-32 relative md:h-32 overflow-hidden border border-neutral-700 rounded-full ">
        {shimmerLoading ? (
          <div className="w-full h-full shimmer"></div>
        ) : (
          <Image
            className="object-cover"
            fill
            priority
            src={avatar || "/images/UserProfile.jpg"}
            alt="profile"
          />
        )}
      </div>
      <div>
        {shimmerLoading ? (
          <div className="w-[100px] h-[24px] rounded-md shimmer"></div>
        ) : (
          <p className="text-2xl font-semibold">{user?.display_name}</p>
        )}
      </div>
      <div className="hidden md:block w-full mt-3">
        <table className=" w-full">
          <tbody>
            <tr className="text-sm text-neutral-400">
              {shimmerLoading ? (
                <td className="w-[80px] shimmer h-[12px] mb-4"></td>
              ) : (
                <td className="pb-4">Other Details</td>
              )}
            </tr>
            <tr className="text-base text-neutral-300">
              <td className="pb-2">
                {shimmerLoading ? (
                  <div className="w-[100px] shimmer h-[19px] rounded-full"></div>
                ) : (
                  "Full Name"
                )}
              </td>
              <td className="text-right pb-2">
                {shimmerLoading ? (
                  <div className="w-[100px] shimmer h-[17px] rounded-full"></div>
                ) : (
                  user?.full_name
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AboutUser