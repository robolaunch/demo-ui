"use client";

import { ReactElement } from "react";

interface ICard {
  children: ReactElement | ReactElement[];
  className?: string;
}

export default function Card({ children, className }: ICard): ReactElement {
  return (
    <div
      className={`hw-full animate__animated animate__fadeIn border border-slate-200 bg-white ${className}`}
    >
      {children}
    </div>
  );
}
