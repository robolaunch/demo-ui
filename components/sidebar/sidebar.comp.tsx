"use client";

import { ReactElement } from "react";
import Image from "next/image";
import SidebarSelect from "../sidebar.select/sidebar.select";
import SidebarMain from "../sidebar.main/sidebar.main";
import SidebarBottom from "../sidebar.bottom.comp/sidebar.bottom.comp";
import { useParams } from "next/navigation";
import SidebarApp from "../sidebar.app/sidebar.app";

export default function Sidebar(): ReactElement {
  const {
    appName,
  }: {
    appName: string;
  } = useParams();

  return (
    <div className="flex h-screen flex-col gap-2 bg-white py-4">
      <div className="m-2 flex flex-col items-center">
        <Image
          width={72}
          height={72}
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
