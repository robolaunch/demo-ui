"use client";

import { CSSProperties, ReactElement } from "react";

interface ICard {
  children: ReactElement | ReactElement[];
  style?: CSSProperties;
  className?: string;
  onClick?: () => void;
}

export default function Card({
  children,
  style,
  className,
  onClick,
}: ICard): ReactElement {
  return (
    <div
      style={style}
      className={`hw-full animate__animated animate__fadeIn rounded-lg border border-slate-200 bg-white ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
