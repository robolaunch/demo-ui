"use client";

import SidebarBottom from "../sidebar.bottom/sidebar.bottom.comp";
import SidebarSelect from "../sidebar.select/sidebar.select.comp";
import SidebarMain from "../sidebar.main/sidebar.main.comp";
import { ReactElement } from "react";
import Image from "next/image";
import useMain from "@/hooks/useMain";

export default function Sidebar(): ReactElement {
  const { sidebarState } = useMain();

  return (
    <div
      className={`flex h-screen flex-col gap-2 border-r border-slate-200 bg-white py-4 ${sidebarState.isOpen ? "w-80" : "hidden"}`}
    >
      <div className="flex h-full flex-col justify-between">
        <div className="flex flex-col gap-6">
          <Image
            className="mx-auto my-2"
            width={64 + 16}
            height={64 + 16}
            alt="robolaunch"
            src={"/icons/rocket.svg"}
          />
          <SidebarSelect />

          <SidebarMain />
        </div>

        <SidebarBottom />
      </div>
    </div>
  );
}
