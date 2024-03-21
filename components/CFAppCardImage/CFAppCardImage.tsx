"use client";

import { ITemplate } from "@/interfaces/template.interface";
import { ReactElement } from "react";
import Image from "next/image";

interface ICFAppCardImage {
  template: ITemplate;
}

export default function CFAppCardImage({
  template,
}: ICFAppCardImage): ReactElement {
  return (
    <div className="flex justify-evenly rounded border border-slate-200">
      <Image
        className="py-2"
        width={92 - 24}
        height={92 - 24}
        style={{
          objectFit: "contain",
        }}
        src={template.app.icon}
        alt={template.app.name}
      />
      <Image
        className="py-2"
        width={92 - 12}
        height={92 - 12}
        style={{
          objectFit: "contain",
        }}
        src="/icons/rocket.svg"
        alt={template.app.name}
      />
    </div>
  );
}
