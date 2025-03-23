import { usePathname, useRouter } from "next/navigation";
import React, { useMemo } from "react";

const NavigateRoutes = () => {
  const router = useRouter();

  const pathname = usePathname();

  const routes = useMemo(
    () => [
      {
        label: "Files",
        active: pathname === "/content/tracks/new/files",
        href: "/content/tracks/new/files",
      },
      {
        label: "Beat Details",
        active: pathname === "/content/tracks/new/info",
        href: "/content/tracks/new/info",
      },
      {
        label: "Beat Licenses",
        active: pathname === "/content/tracks/new/licenses",
        href: "/content/tracks/new/licenses",
      },
      {
        label: "Review",
        active: pathname === "/content/tracks/new/review",
        href: "/content/tracks/new/review",
      },
    ],
    [pathname]
  );

  return (
    <div>
      <ul className="flex justify-start items-center text-xl gap-x-6 ">
        {routes.map((item) => (
          <li
            key={item.label}
            className={`cursor-pointer mb-5 ${
              item.active === true
                ? "text-blue-500 underline underline-offset-[14px]"
                : "text-white"
            }`}
            onClick={() => {
              router.replace(item.href);
            }}
          >
            <div>{item.label}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavigateRoutes;
