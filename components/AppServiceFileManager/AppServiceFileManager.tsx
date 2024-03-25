import { Fragment, ReactElement, useState } from "react";
import Modal from "../Modal/Modal";
import useApp from "@/hooks/useApp";
import ToggleButton from "../ToggleButton/ToggleButton";

interface IFileManager {
  type: "ide" | "vdi";
}

export default function FileManager({ type }: IFileManager): ReactElement {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const { appData } = useApp();

  return (
    <Fragment>
      <ToggleButton
        className="service-button"
        onClick={() => setIsOpened(!isOpened)}
        offLabel="File Manager"
        onLabel="File Manager"
        checked={false}
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
