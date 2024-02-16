"use client";

import SidebarBottom from "../sidebar.bottom/sidebar.bottom.comp";
import SidebarSelect from "../sidebar.select/sidebar.select.comp";
import SidebarMain from "../sidebar.main/sidebar.main.comp";
import SidebarApp from "../sidebar.app/sidebar.app.comp";
import { useParams } from "next/navigation";
import { ReactElement } from "react";
import Image from "next/image";
import useMain from "@/hooks/useMain";

export default function Sidebar(): ReactElement {
  const {
    appName,
  }: {
    appName: string;
  } = useParams();

  const { sidebarState } = useMain();

  return (
    <div
      className={`flex h-screen flex-col gap-2 border-r border-slate-200 bg-white py-4 ${sidebarState.isOpen ? "w-72" : "hidden"}`}
    >
      <div className="m-2 flex flex-col items-center">
        <Image
          width={64 + 16}
          height={64 + 16}
          alt="robolaunch"
          src={"/icons/rocket.svg"}
        />
      </div>

      <div className="flex h-full flex-col justify-between">
        <SidebarSelect />

        {appName ? <SidebarApp /> : <SidebarMain />}

        <SidebarBottom />
      </div>
    </div>
  );
}
