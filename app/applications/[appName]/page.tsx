"use client";

import { Fragment, ReactElement } from "react";

interface IAppPage {
  params: {
    appName: string;
  };
}

export default function AppPage({ params }: IAppPage): ReactElement {
  return <Fragment></Fragment>;
}
