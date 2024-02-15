"use client";

import IDE from "@/components/app.ide/app.ide";
import VDI from "@/components/app.vdi/app.vdi";
import { Fragment, ReactElement } from "react";
import useMain from "@/hooks/useMain";

interface IAppPage {
  params: {
    appName: string;
  };
}

export default function AppPage({ params }: IAppPage): ReactElement {
  const { appState } = useMain();

  return (
    <Fragment>
      {(() => {
        switch (appState.activeTab) {
          case "overview":
            return <Fragment>overview</Fragment>;
          case "ide":
            return <IDE />;
          case "vdi":
            return <VDI />;
        }
      })()}
    </Fragment>
  );
}
