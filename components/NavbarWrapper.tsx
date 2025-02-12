"use client";

import { Beat } from "@/types";
import Navbar from "./Navbar";
import { usePathname } from "next/navigation";

interface NavBarWrapperProps {
  beats: Beat[];
}

const NavBarWrapper: React.FC<NavBarWrapperProps> = ({ beats }) => {
  const pathname = usePathname();
  const noNavbarRoutes = [
    "/auth/signup",
    "/auth/signin",
  ];

  return <div className="
              ">{!noNavbarRoutes.includes(pathname) && <Navbar beats={beats} />}</div>;
};

export default NavBarWrapper;
