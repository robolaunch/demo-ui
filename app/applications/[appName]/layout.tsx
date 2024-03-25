"use client";

import AppProvider from "@/contexts/AppContext";
import { Fragment, ReactElement } from "react";

interface IAppLayout {
  children: ReactElement;
}

export default function AppLayout({ children }: IAppLayout): ReactElement {
  return (
    <Fragment>
      <AppProvider>{children}</AppProvider>
    </Fragment>
  );
}
