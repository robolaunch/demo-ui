"use client";

import { IoLogoPython, IoTerminal, IoTv } from "react-icons/io5";
import { IEnvironment } from "@/interfaces/environment.interface";
import { useRouter } from "next/navigation";
import { ReactElement } from "react";

interface ISidebarAppItemService {
  type: "ide" | "vdi" | "jupyterNotebook";
  app: IEnvironment;
}

export default function SidebarAppItemService({
  type,
  app,
}: ISidebarAppItemService): ReactElement {
  const router = useRouter();

  return (
    <button
      className={`transition-500 animate__animated animate__fadeIn flex w-full items-center justify-between gap-3 py-3 pl-11 hover:bg-slate-100 disabled:cursor-not-allowed`}
      onClick={() => {
        if (type === "jupyterNotebook") {
          return window.open(
            app.services.jupyterNotebook.httpsEndpoint,
            "_blank",
          );
        }

        router.push(
          `/applications/${app.details.name}/${(() => {
            switch (type) {
              case "ide":
                return "code-editor";
              case "vdi":
                return "remote-desktop";
            }
          })()}`,
        );
      }}
    >
      <div className="flex gap-2">
        {(() => {
          switch (type) {
            case "ide":
              return <IoTerminal size={20} />;
            case "vdi":
              return <IoTv size={21} />;
            case "jupyterNotebook":
              return <IoLogoPython size={21} />;
          }
        })()}
        <span className="text-sm font-normal">
          {(() => {
            switch (type) {
              case "ide":
                return "Code Editor";
              case "vdi":
                return "Remote Desktop";
              case "jupyterNotebook":
                return "Jupyter Notebook";
            }
          })()}
        </span>
      </div>
    </button>
  );
}
