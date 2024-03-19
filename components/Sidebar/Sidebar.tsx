"use client";

import SidebarBottom from "../SidebarBottom/SidebarBottom";
import SidebarSelect from "../SidebarSelect/SidebarSelect";
import SidebarMain from "../SidebarMain/SidebarMain";
import useMain from "@/hooks/useMain";
import { ReactElement, useEffect } from "react";
import Image from "next/image";
import env from "@/providers/env.provider";

export default function Sidebar(): ReactElement {
  const { sidebarState } = useMain();

  useEffect(() => {
    console.log("env", env);
  }, []);

  return (
    <div
      className={`flex h-screen flex-col justify-between gap-2 border-r border-slate-200 bg-white py-4 ${sidebarState.isOpen ? "w-80" : "hidden"}`}
    >
      <div className="flex h-full flex-col gap-6 overflow-auto">
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
  );
}
