"use client";

import SidebarBottom from "../sidebar.bottom/sidebar.bottom.comp";
import SidebarSelect from "../sidebar.select/sidebar.select.comp";
import SidebarMain from "../sidebar.main/sidebar.main.comp";
import SidebarApp from "../sidebar.app/sidebar.app.comp";
import { useParams } from "next/navigation";
import { ReactElement } from "react";
import Image from "next/image";
import useMain from "@/hooks/useMain";
import AppProvider from "@/contexts/app.context";

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

          {appName ? (
            <AppProvider>
              <SidebarApp />
            </AppProvider>
          ) : (
            <SidebarMain />
          )}
        </div>

        <SidebarBottom />
      </div>
    </div>
  );
}
