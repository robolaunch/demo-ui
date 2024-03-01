import SidebarAppItem from "../SidebarAppItem/SidebarAppItem";
import { IoIosApps, IoIosArrowForward } from "react-icons/io";
import { Fragment, ReactElement, useState } from "react";
import useMain from "@/hooks/useMain";
import { IoApps } from "react-icons/io5";

export default function SidebarApplicationsItem(): ReactElement {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
  const { applications } = useMain();

  return (
    <div className="transition-300 flex flex-col">
      <button
        className={`transition-500 animate__animated animate__fadeIn flex w-full items-center justify-between gap-2 py-3 pl-6 pr-4 hover:bg-slate-100 disabled:cursor-not-allowed`}
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div className="flex gap-2">
          <IoApps size={22} />
          <span className="text-base font-normal">Applications</span>
        </div>
        <div className="flex gap-2">
          <IoIosArrowForward
            className={`transition-300 ${isCollapsed ? "rotate-90" : "rotate-0"}`}
          />
        </div>
      </button>
      {isCollapsed && (
        <Fragment>
          {applications.map((app, index) => {
            return <SidebarAppItem app={app} key={index} />;
          })}
        </Fragment>
      )}
    </div>
  );
}
