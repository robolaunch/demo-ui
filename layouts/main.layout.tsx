"use client";

import Sidebar from "@/components/sidebar/sidebar.comp";
import { ReactElement } from "react";

interface IMainLayout {
  children: Readonly<ReactElement | ReactElement[]>;
}

export default function MainLayout({ children }: IMainLayout): ReactElement {
  return (
    <div className="grid grid-cols-12 hw-screen bg-slate-100">
      <div className="col-span-2 animate__animated animate__fadeInLeft">
        <Sidebar />
      </div>
      <div className="col-span-10 relative">{children}</div>
    </div>
  );
}
