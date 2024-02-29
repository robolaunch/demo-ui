"use client";

import VDI from "@/components/app.vdi/app.vdi.comp";
import WEBRTCProvider from "@/contexts/vdi.context";
import { applicationFinder } from "@/functions/environment.function";
import useMain from "@/hooks/useMain";
import { IEnvironment } from "@/interfaces/environment.interface";
import { useParams } from "next/navigation";

import { ReactElement } from "react";

export default function RemoteDesktop(): ReactElement {
  const { applications } = useMain();

  const params = useParams();

  const app: IEnvironment = applicationFinder(
    applications,
    params.appName as string,
  );

  return (
    <WEBRTCProvider socketEndpoint={app?.services?.vdi?.socketEndpoint}>
      <VDI />
    </WEBRTCProvider>
  );
}
