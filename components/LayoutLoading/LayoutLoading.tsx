"use client";
import { ReactElement } from "react";
import Image from "next/image";

export default function LayoutLoading(): ReactElement {
  return (
    <div className="animate-fadeIn absolute inset-0 z-[99999] flex flex-col items-center justify-center bg-slate-100">
      <Image
        src="/icons/ring.svg"
        width={64}
        height={64}
        className="w-28 animate-spin rounded-full bg-light-50 shadow"
        alt="ring"
        priority
      />
      <Image
        src="/icons/rocket.svg"
        width={64}
        height={64}
        className="fixed w-14 pb-1"
        alt="rocket"
        priority
      />
    </div>
  );
}
