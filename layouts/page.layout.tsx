"use client";

import { ReactElement } from "react";

interface IPageLayout {
  children: ReactElement | ReactElement[];
  title: string;
  paragraph: string;
}

export default function PageLayout({
  children,
  title,
  paragraph,
}: IPageLayout): ReactElement {
  return (
    <div className="hw-full grid grid-rows-12 px-24 py-10">
      <div className="hw-full row-span-1 flex flex-col justify-between">
        <h1 className="text-2xl font-medium text-slate-600">{title}</h1>
        <p className="text-sm text-slate-400">{paragraph}</p>
        <span className="w-hull h-[1px] bg-slate-300" />
      </div>
      <div className="hw-full row-span-11 py-8">{children}</div>
    </div>
  );
}
