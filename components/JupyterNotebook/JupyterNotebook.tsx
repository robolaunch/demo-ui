"use client";

import { ReactElement } from "react";
import Card from "../card/card.comp";
import AppServiceControlBar from "../app.service.controlbar/app.service.controlbar.comp";
import useMain from "@/hooks/useMain";
import { IEnvironment } from "@/interfaces/environment.interface";
import {
  applicationFinder,
  getApplicationStatus,
} from "@/functions/environment.function";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

export default function JupyterNotebook(): ReactElement {
  const { applications } = useMain();
  const params = useParams();

  const app: IEnvironment = applicationFinder(
    applications,
    params.appName as string,
  );

  const status = getApplicationStatus(app);

  const router = useRouter();

  if (status !== "EnvironmentReady") {
    toast.warning("This service is not ready.");
    router.push("/create");
  }

  return (
    <Card className="relative">
      <iframe
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-modals allow-top-navigation-by-user-activation"
        className="hw-full"
        title="ide"
        allow="clipboard-read"
        src={app?.services?.jupyterNotebook?.httpsEndpoint}
      />
      <AppServiceControlBar type="ide" />
    </Card>
  );
}