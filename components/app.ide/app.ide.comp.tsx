"use client";

import { ReactElement } from "react";
import Card from "../card/card.comp";
import AppServiceControlBar from "../app.service.controlbar/app.service.controlbar.comp";
import useMain from "@/hooks/useMain";
import { IEnvironment } from "@/interfaces/environment.interface";
import { applicationFinder } from "@/functions/environment.function";
import { useParams } from "next/navigation";

export default function IDE(): ReactElement {
  const { applications, sidebarState } = useMain();
  const params = useParams();

  const app: IEnvironment = applicationFinder(
    applications,
    params.appName as string,
  );

  return (
    <Card className="relative">
      <iframe
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-modals allow-top-navigation-by-user-activation"
        className="hw-full"
        title="ide"
        allow="clipboard-read"
        src={app?.services?.ide?.httpsEndpoint}
      />
      <AppServiceControlBar type="ide" />
    </Card>
  );
}
