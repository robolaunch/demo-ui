"use client";

import { ReactElement } from "react";

interface ICard {
  children: ReactElement | ReactElement[];
  className?: string;
  onClick?: () => void;
}

export default function Card({
  children,
  className,
  onClick,
}: ICard): ReactElement {
  return (
    <div
      className={`hw-full animate__animated animate__fadeIn rounded-lg border border-slate-200 bg-white ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
