import { Button } from "primereact/button";
import { ToggleButton } from "primereact/togglebutton";
import { Fragment, ReactElement, useState } from "react";
import { IoFolderOpenOutline } from "react-icons/io5";

export default function FileManager(): ReactElement {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  return (
    <Fragment>
      <ToggleButton
        offIcon={<IoFolderOpenOutline />}
        offLabel="File Manager"
        className="w-32 text-xs"
      />
    </Fragment>
  );
}
