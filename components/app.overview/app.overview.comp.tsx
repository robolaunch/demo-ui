"use client";

import { ReactElement } from "react";
import Card from "../card/card.comp";
import AppStatusCard from "../app.status.card/app.status.card";
import AppTemplateCard from "../app.template.card/app.template.card";
import AppServiceCard from "../app.service.card/app.service.card";
import useApp from "@/hooks/useApp";

export default function Overview(): ReactElement {
  const { appData } = useApp();

  return (
    <div className="hw-full flex flex-col gap-12">
      <div className="hw-full grid grid-cols-2 gap-12">
        <div className="col-span-1">
          <AppStatusCard />
        </div>
        <div className="col-span-1">
          <AppTemplateCard />
        </div>
      </div>
      <div
        className="hw-full grid gap-12"
        style={
          appData?.services?.jupyterNotebook?.httpsEndpoint
            ? {
                gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              }
            : {
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              }
        }
      >
        <div className="col-span-1">
          <AppServiceCard type="ide" />
        </div>
        <div className="col-span-1">
          <AppServiceCard type="vdi" />
        </div>
        {appData?.services?.jupyterNotebook?.httpsEndpoint && (
          <div className="col-span-1">
            <AppServiceCard type="jupyterNotebook" />
          </div>
        )}
      </div>
    </div>
  );
}
