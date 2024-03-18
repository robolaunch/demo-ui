"use client";

import { IEnvironment } from "@/interfaces/environment.interface";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { ReactElement, useRef, useState } from "react";
import ModalAppEvents from "../ModalAppEvents/ModalAppEvents";
import { getApplicationStatus } from "@/functions/environment.function";

interface ISidebarAppDots {
  app: IEnvironment;
}

export default function SidebarAppDots({ app }: ISidebarAppDots): ReactElement {
  const menuRight: any = useRef(null);

  const [activeModal, setActiveModal] = useState<
    "start" | "stop" | "terminate" | null
  >(null);

  return (
    <div className="card flex items-center justify-center">
      <Menu
        model={[
          {
            label: "Application Settings",
            items: [
              {
                label: "Info",
                icon: "pi pi-info-circle",
                command: async () => {
                  console.log("Info");
                },
                visible: false,
              },
              {
                label: "Start",
                icon: "pi pi-chevron-circle-right",
                command: () => {
                  setActiveModal("start");
                },
                visible: getApplicationStatus(app) === "Stopped",
              },
              {
                label: "Stop",
                icon: "pi pi-stop-circle",
                command: () => {
                  setActiveModal("stop");
                },
                visible: getApplicationStatus(app) === "EnvironmentReady",
              },
              {
                label: "Terminate",
                icon: "pi pi-trash",
                command: () => {
                  setActiveModal("terminate");
                },
              },
            ],
          },
        ]}
        popup
        ref={menuRight}
        id="popup_menu_right"
        popupAlignment="right"
        className="w-fit text-sm"
      />
      <Button
        label="..."
        className="m-0 block h-5 w-5 -rotate-90 border-0 bg-transparent p-0 text-xs tracking-widest text-black"
        onClick={(event) => menuRight.current.toggle(event)}
        aria-controls="popup_menu_right"
        aria-haspopup
      />
      {activeModal && (
        <ModalAppEvents
          appName={app.details.name}
          onClose={() => setActiveModal(null)}
          type={activeModal}
        />
      )}
    </div>
  );
}
