"use client";

import SidebarAppItemService from "../SidebarAppItemService/SidebarAppItemService";
import { getApplicationStatus } from "@/functions/environment.function";
import { IEnvironment } from "@/interfaces/environment.interface";
import { IoIosApps, IoIosArrowForward } from "react-icons/io";
import SidebarAppDots from "../SidebarAppDots/SidebarAppDots";
import { Fragment, ReactElement, useState } from "react";
import Status from "../AppStatus/AppStatus";
import { Tooltip } from "primereact/tooltip";
import SidebarAppItemTooltip from "../SidebarAppItemTooltip/SidebarAppItemTooltip";

interface ISidebarAppItem {
  app: IEnvironment;
}

export default function SidebarAppItem({ app }: ISidebarAppItem): ReactElement {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  return (
    <Fragment>
      <Tooltip target={`.app-${app.details.name}`} position="right">
        <SidebarAppItemTooltip app={app} />
      </Tooltip>
      <div className="transition-300 flex flex-col">
        <button
          className={`transition-500 animate__animated animate__fadeIn flex w-full items-center justify-between gap-2 py-3 pl-8 pr-4 hover:bg-slate-100 disabled:cursor-not-allowed`}
        >
          <div className={`flex items-center gap-2 app-${app.details.name}`}>
            <IoIosApps size={22} />
            <span className="text-base font-normal">
              {app?.details?.name.length > 8
                ? app?.details?.name.slice(0, 8) + "..."
                : app?.details?.name}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Status status={getApplicationStatus(app)} />
            <SidebarAppDots app={app} />
            <IoIosArrowForward
              className={`transition-300 ${isCollapsed ? "rotate-90" : "rotate-0"}`}
              onClick={() => setIsCollapsed(!isCollapsed)}
            />
          </div>
        </button>
        {isCollapsed && (
          <Fragment>
            <SidebarAppItemService type="ide" app={app} />
            <SidebarAppItemService type="vdi" app={app} />
            {app?.services?.jupyterNotebook?.isEnabled && (
              <SidebarAppItemService type="jupyterNotebook" app={app} />
            )}
          </Fragment>
        )}
      </div>
    </Fragment>
  );
}
