import { ReactElement, useState } from "react";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import FileManager from "../app.service.controlbar.filemanager/app.service.controlbar.filemanager.comp";
import Control from "../app.service.controlbar.control/app.service.controlbar.control.comp";

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
          <FileManager />
          {type === "vdi" && <Control />}
        </div>
      )}
    </div>
  );
}
