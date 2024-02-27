"use client";

import AppCardHeader from "../app.card.header/app.card.header.comp";
import AppCardBody from "../app.card.body/app.card.body.comp";
import { IEnvironment } from "@/interfaces/environment.interface";
import { useRouter } from "next/navigation";
import { ReactElement } from "react";
import Card from "../card/card.comp";
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
    <Card className="!rounded-xl">
      <div
        className="hw-full transition-500 flex cursor-pointer flex-col bg-white p-7 hover:scale-105 hover:shadow-lg"
        onClick={() => {
          isReady
            ? router.push(`/applications/${app.details.name}`)
            : toast.warning("Application is not ready yet. Please wait.");
        }}
      >
        <AppCardHeader title={app.details.name} status={app?.status} />
        <AppCardBody app={app} />
      </div>
    </Card>
  );
}
