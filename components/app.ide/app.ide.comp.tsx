"use client";

import { ReactElement } from "react";
import Card from "../card/card.comp";
import useApp from "@/hooks/useApp";
import AppServiceControlBar from "../app.service.controlbar/app.service.controlbar.comp";

export default function IDE(): ReactElement {
  const { appData } = useApp();

  return (
    <Card className="relative">
      <iframe
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-modals allow-top-navigation-by-user-activation"
        className="hw-full"
        title="ide"
        allow="clipboard-read"
        src={appData?.services?.ide?.httpsEndpoint}
      />
      <AppServiceControlBar type="ide" />
    </Card>
  );
}
