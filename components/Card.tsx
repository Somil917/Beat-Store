"use client";

import { twMerge } from "tailwind-merge";
import { useEffect, useRef } from "react";

interface CardProps {
  setIsCardOpen?: (isOpen: boolean) => void; // Ensure it's a function
  className?: string;
  children?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ setIsCardOpen, className, children }) => {
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Function to handle clicks outside the card
    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setTimeout(() => {
          setIsCardOpen!(false);
        }, 200); // Small delay to prevent immediate reopen on mouseup
      }
    };

    // Add event listener to detect clicks outside
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsCardOpen]); // Depend on setIsCardOpen to avoid stale closure

  return (
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
  );
};

export default Card;
