"use client";

import useLoadBeatUrl from "@/hooks/useLoadBeatUrl";
import { twMerge } from "tailwind-merge";
import MediaItem from "./MediaItem";
import { Beat } from "@/types";
import LikedContent from "@/app/liked/components/LikedContent";
import LikeButton from "./LikeButton";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface CardProps {
  className?: string;
  children?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ className, children }) => {

    const router = useRouter();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(true)
    const cardRef = useRef<HTMLDivElement | null>(null);


    // useEffect(() => {
    //       if (pathname === '/liked') {
    //         setIsOpen(false); // Close the card when navigating to /liked
    //     }
        
    // }, [pathname]);

    useEffect(() => {
        // Function to handle clicks outside the card
        const handleClickOutside = (event: MouseEvent) => {
          if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
            setIsOpen(false); // Close the card if clicked outside
          }
        };
    
        // Add the event listener to the document
        document.addEventListener("mousedown", handleClickOutside);
    
        // Cleanup the event listener on unmount
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

  return (
    isOpen && (
    <div
        ref={cardRef}
      className={twMerge(
        `
        w-[350px]
        h-[360px]
        bg-[#1E1E1D]
        text-white
        flex
        flex-col
        justify-between
        border
        border-neutral-700
        fixed
        z-50 
        top-[50px] 
        right-[230px]
        p-2
        rounded-md
        drop-shadow-2xl
        shadow-2xl
        `,
        className
      )}
    >
      {children}
    </div>
  )
    )
}

export default Card;
