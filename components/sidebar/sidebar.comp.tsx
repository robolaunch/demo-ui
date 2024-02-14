"use client";

import { ReactElement } from "react";
import Image from "next/image";
import SidebarItem from "../sidebar.item/sidebar.item.comp";
import {
  IoLogOutOutline,
  IoHelpBuoyOutline,
  IoAddCircleOutline,
  IoAppsOutline,
  IoGridOutline,
} from "react-icons/io5";
import { useRouter } from "next/navigation";
import useMain from "@/hooks/useMain";
import SidebarSelect from "../sidebar.select/sidebar.select";

export default function Sidebar(): ReactElement {
  const router = useRouter();

  const { sidebarState, setSidebarState } = useMain();

  return (
    <div className="h-screen bg-white py-4">
      <Image
        className="mx-auto"
        width={72}
        height={72}
        alt="robolaunch"
        src={"/icons/rocket.svg"}
      />

      <SidebarSelect />

      {[
        {
          label: "Overview",
          icon: <IoGridOutline size={22} />,
        },
        {
          label: "Create",
          icon: <IoAddCircleOutline size={22} />,
        },
        {
          label: "Applications",
          icon: <IoAppsOutline size={22} />,
        },
        {
          label: "Help",
          icon: <IoHelpBuoyOutline size={22} />,
        },
        {
          label: "Logout",
          icon: <IoLogOutOutline size={22} />,
        },
      ].map((item, index) => {
        return (
          <SidebarItem
            active={sidebarState.activeIndex === item.label.toLowerCase()}
            key={index}
            icon={item.icon}
            label={item.label}
            onClick={() => {
              setSidebarState({
                ...sidebarState,
                activeIndex: item.label.toLowerCase(),
              });
              router.push(`/${item.label.toLowerCase()}`);
            }}
          />
        );
      })}
    </div>
  );
}
