import { Fragment, ReactElement, useState } from "react";
import { IoFolderOpenOutline } from "react-icons/io5";

export default function FileManager(): ReactElement {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  return (
    <Fragment>
      <div className="flex w-full cursor-pointer flex-col items-center gap-1 p-2">
        <IoFolderOpenOutline size={24} />
        <p className="break-keep text-xs">File Manager</p>
      </div>
    </Fragment>
  );
}
