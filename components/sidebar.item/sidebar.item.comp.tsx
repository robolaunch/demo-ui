"use client";

import { ReactElement } from "react";

interface ISidebarItem {
  icon: ReactElement;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export default function SidebarItem({
  icon,
  label,
  active,
  onClick,
}: ISidebarItem): ReactElement {
  return (
    <button
      className={`transition-500 text- flex w-full items-center gap-2 px-10 py-4 hover:bg-slate-100 ${active && "bg-slate-100"}`}
      onClick={() => onClick && onClick()}
    >
      {icon}
      <span className="text-base font-normal">{label}</span>
    </button>
  );
}
