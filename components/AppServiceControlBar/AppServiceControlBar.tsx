import { ReactElement, useState } from "react";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import AppServiceFileManager from "../AppServiceFileManager/AppServiceFileManager";
import AppServiceLog from "../AppServiceLog/AppServiceLog";
import AppServiceRestart from "../AppServiceRestart/AppServiceRestart";
import AppServiceVDI from "../AppServiceVDI/AppServiceVDI";

interface IAppServiceControlBar {
  type: "ide" | "vdi";
}

export default function AppServiceControlBar({
  type,
}: IAppServiceControlBar): ReactElement {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="absolute bottom-0 left-1/2 right-1/2 flex flex-col items-center">
      <button
        className="rounded-t-lg bg-slate-200 px-3 py-0.5"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <MdOutlineKeyboardArrowDown /> : <MdOutlineKeyboardArrowUp />}
      </button>
      {isOpen && (
        <div className="flex items-center gap-6 rounded-t-lg bg-slate-200 px-6 pb-2 pt-3">
          <AppServiceFileManager type={type} />
          <AppServiceLog type={type} />
          <AppServiceRestart type={type} />
          {type === "vdi" && <AppServiceVDI />}
        </div>
      )}
    </div>
  );
}
