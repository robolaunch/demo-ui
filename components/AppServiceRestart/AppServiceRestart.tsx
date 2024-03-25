import { ToggleButton } from "primereact/togglebutton";
import { Fragment, ReactElement, useState } from "react";
import Modal from "../Modal/Modal";
import useApp from "@/hooks/useApp";

interface IAppServiceRestart {
  type: "ide" | "vdi";
}

export default function AppServiceRestart({
  type,
}: IAppServiceRestart): ReactElement {
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
