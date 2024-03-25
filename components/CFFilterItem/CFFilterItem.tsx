"use client";

import { ReactElement } from "react";

interface ICFFilterItem {
  label: string;
  children: ReactElement | ReactElement[];
}

export default function CFFilterItem({
  label,
  children,
}: ICFFilterItem): ReactElement {
  return (
    <div className="flex flex-col gap-5">
      <p className="font-medium">{label}</p>
      <div className="flex flex-col gap-3">{children}</div>
    </div>
  );
}
