"use client";

import Overview from "@/components/app.overview/app.overview.comp";
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
            return <Overview />;
          case "code editor":
            return <IDE />;
          case "remote desktop":
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
