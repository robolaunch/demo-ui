"use client";

import MainProvider from "@/providers/main.provider";
import { Fragment, ReactElement } from "react";

interface IMainLayout {
  children: Readonly<ReactElement | ReactElement[]>;
}

export default function MainLayout({ children }: IMainLayout) {
  return (
    <MainProvider>
      <Fragment>{children}</Fragment>
    </MainProvider>
  );
}
