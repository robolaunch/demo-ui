import { ToggleButton } from "primereact/togglebutton";
import { Fragment, ReactElement, useState } from "react";
import Modal from "../Modal/Modal";
import useApp from "@/hooks/useApp";

interface IFileManager {
  type: "ide" | "vdi";
}

export default function FileManager({ type }: IFileManager): ReactElement {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const { appData } = useApp();

  return (
    <Fragment>
      <ToggleButton
        onClick={() => setIsOpened(!isOpened)}
        offLabel="File Manager"
        className="w-32 text-xs"
      />
      {isOpened && (
        <Modal
          header="File Manager"
          onClose={() => setIsOpened(false)}
          style={{ width: "90vw", height: "90vh" }}
        >
          <iframe
            className="hw-full"
            src={appData?.services?.[`${type}`]?.fileManagerEndpoint}
          />
        </Modal>
      )}
    </Fragment>
  );
}
