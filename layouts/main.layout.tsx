"use client";

import Sidebar from "@/components/sidebar/sidebar.comp";
import { ReactElement } from "react";

interface IMainLayout {
  children: Readonly<ReactElement | ReactElement[]>;
}

export default function MainLayout({ children }: IMainLayout): ReactElement {
  return (
    <div className="hw-screen grid grid-cols-12 bg-slate-100">
      <div className="animate__animated animate__fadeInLeft col-span-2">
        <Sidebar />
      </div>
      <div className="relative col-span-10">{children}</div>
    </div>
  );
}
