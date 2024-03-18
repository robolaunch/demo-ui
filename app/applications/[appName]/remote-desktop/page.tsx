"use client";

import AppVDI from "@/components/AppVDI/AppVDI";
import WEBRTCProvider from "@/contexts/vdi.context";
import {
  applicationFinder,
  getApplicationStatus,
} from "@/functions/environment.function";
import useMain from "@/hooks/useMain";
import { IEnvironment } from "@/interfaces/environment.interface";
import { useParams, useRouter } from "next/navigation";

import { ReactElement } from "react";
import { toast } from "sonner";

export default function RemoteDesktop(): ReactElement {
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
    <WEBRTCProvider socketEndpoint={app?.services?.vdi?.socketEndpoint}>
      <AppVDI />
    </WEBRTCProvider>
  );
}
