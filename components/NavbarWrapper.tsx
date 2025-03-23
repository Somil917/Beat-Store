"use client";

import { Beat } from "@/types";
import Navbar from "./Navbar";
import { usePathname } from "next/navigation";

interface NavBarWrapperProps {
  cartItems: any[];
}

const NavBarWrapper: React.FC<NavBarWrapperProps> = ({ cartItems }) => {
  const pathname = usePathname();
  const noNavbarRoutes = ["/auth/signup", "/auth/signin"];

  return (
    <div
      className="
              "
    >
      {!noNavbarRoutes.includes(pathname) && <Navbar cartItems={cartItems} />}
    </div>
  );
};

export default NavBarWrapper;
