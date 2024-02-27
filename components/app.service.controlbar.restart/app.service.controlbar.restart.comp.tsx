import { ToggleButton } from "primereact/togglebutton";
import { Fragment, ReactElement, useState } from "react";
import Modal from "../modal/modal.comp";
import useApp from "@/hooks/useApp";

interface IServiceRestart {
  type: "ide" | "vdi";
}

export default function ServiceRestart({
  type,
}: IServiceRestart): ReactElement {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const { appData } = useApp();

  return (
    <Fragment>
      <ToggleButton
        onClick={() => setIsOpened(!isOpened)}
        offLabel="Restart"
        className="w-32 text-xs"
      />
      {isOpened && (
        <Modal
          header="Restart Service"
          onClose={() => setIsOpened(false)}
          style={{ width: "40vw", height: "30vh" }}
        >
          <>Dev</>
        </Modal>
      )}
    </Fragment>
  );
}
