"use client";

import IDE from "@/components/app.ide/app.ide.comp";
import VDI from "@/components/app.vdi/app.vdi.comp";
import { Fragment, ReactElement } from "react";
import useMain from "@/hooks/useMain";
import VDIProvider from "@/providers/vdi.provider";

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
            return (
              <VDIProvider>
                <VDI />
              </VDIProvider>
            );
        }
      })()}
    </Fragment>
  );
}
