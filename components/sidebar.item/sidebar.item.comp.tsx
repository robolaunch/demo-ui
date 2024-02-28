"use client";

import { ReactElement } from "react";

interface ISidebarItem {
  icon: ReactElement;
  label: string;
  active?: boolean;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export default function SidebarItem({
  icon,
  label,
  active,
  onClick,
  className,
  disabled,
}: ISidebarItem): ReactElement {
  return (
    <button
      disabled={disabled}
      className={`transition-500 animate__animated animate__fadeIn flex w-full items-center gap-2 px-6 py-3 hover:bg-slate-100 disabled:cursor-not-allowed ${active && "bg-slate-100"} ${className}`}
      onClick={() => onClick && onClick()}
    >
      {icon}
      <span className="text-base font-normal">{label}</span>
    </button>
  );
}
