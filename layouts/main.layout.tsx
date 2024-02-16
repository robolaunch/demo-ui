"use client";

import SidebarButton from "@/components/sidebar.button/sidebar.button.comp";
import Sidebar from "@/components/sidebar/sidebar.comp";
import { ReactElement } from "react";

interface IMainLayout {
  children: Readonly<ReactElement | ReactElement[]>;
}

export default function MainLayout({ children }: IMainLayout): ReactElement {
  return (
    <div className="hw-screen flex bg-slate-100">
      <div className="animate__animated animate__fadeInLeft">
        <Sidebar />
      </div>
      <div className="relative w-full">
        <SidebarButton />
        {children}
      </div>
    </div>
  );
}
