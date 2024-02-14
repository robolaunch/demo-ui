"use client";

import MainProvider from "@/providers/main.provider";
import { ReactElement } from "react";

interface IMainLayout {
  children: Readonly<ReactElement | ReactElement[]>;
}

export default function MainLayout({ children }: IMainLayout) {
  return <MainProvider>{children}</MainProvider>;
}
