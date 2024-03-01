import { IEnvironment } from "@/interfaces/environment.interface";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { ReactElement, useRef } from "react";

interface ISidebarAppDots {
  app: IEnvironment;
}

export default function SidebarAppDots({ app }: ISidebarAppDots): ReactElement {
  const menuRight: any = useRef(null);

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
                command: () => {
                  console.log("Start");
                },
              },
              {
                label: "Start",
                icon: "pi pi-chevron-circle-right",
                command: () => {
                  console.log("Start");
                },
              },
              {
                label: "Stop",
                icon: "pi pi-stop-circle",
                command: () => {
                  console.log("Stop");
                },
              },
              {
                label: "Terminate",
                icon: "pi pi-trash",
                command: () => {
                  console.log("Terminate");
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
    </div>
  );
}
