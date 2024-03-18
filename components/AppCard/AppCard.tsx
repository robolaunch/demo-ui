"use client";

import AppCardHeader from "../AppCardHeader/AppCardHeader";
import AppCardBody from "../AppCardBody/AppCardBody";
import { IEnvironment } from "@/interfaces/environment.interface";
import { useRouter } from "next/navigation";
import { ReactElement } from "react";
import Card from "../Card/Card";
import { toast } from "sonner";

interface IAppCard {
  app: IEnvironment;
}

export default function AppCard({ app }: IAppCard): ReactElement {
  const isReady = Boolean(
    app.clusters.environment.find(
      (cluster) => cluster.status === "EnvironmentReady",
    ),
  );
  const router = useRouter();

  return (
    <Card
      className="transition-500 flex !h-fit w-full cursor-pointer flex-col gap-6 p-7 hover:scale-105 hover:shadow-lg"
      onClick={() => {
        isReady
          ? router.push(`/applications/${app.details.name}`)
          : toast.warning("Application is not ready yet. Please wait.");
      }}
    >
      <AppCardHeader title={app.details.name} />
      <AppCardBody app={app} />
    </Card>
  );
}
