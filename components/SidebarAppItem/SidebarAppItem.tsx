import { Fragment, ReactElement, useEffect, useState } from "react";
import { IoIosApps, IoIosArrowForward } from "react-icons/io";
import { IEnvironment } from "@/interfaces/environment.interface";
import SidebarAppItemService from "../SidebarAppItemService/SidebarAppItemService";
import Status from "../app.status/app.status.comp";
import { getApplicationStatus } from "@/functions/environment.function";

interface ISidebarAppItem {
  app: IEnvironment;
}

export default function SidebarAppItem({ app }: ISidebarAppItem): ReactElement {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  const appStatus: string = app?.clusters?.environment?.length
    ? app?.clusters?.environment?.find(
        (env) => env.status !== "EnvironmentReady",
      )?.status || "EnvironmentReady"
    : "Unreachable Status";

  return (
    <div className="flex flex-col">
      <button
        className={`transition-500 animate__animated animate__fadeIn flex w-full items-center justify-between gap-2 px-6 py-3 hover:bg-slate-100 disabled:cursor-not-allowed`}
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div className="flex gap-2">
          <IoIosApps size={22} />
          <span className="text-base font-normal">{app?.details?.name}</span>
          <Status status={getApplicationStatus(app)} />
        </div>
        <IoIosArrowForward
          className={`${isCollapsed ? "rotate-90" : "rotate-0"}`}
        />
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
  );
}
