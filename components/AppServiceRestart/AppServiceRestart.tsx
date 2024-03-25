import { Fragment, ReactElement, useState } from "react";
import Modal from "../Modal/Modal";
import ToggleButton from "../ToggleButton/ToggleButton";

interface IAppServiceRestart {
  type: "ide" | "vdi";
}

export default function AppServiceRestart({
  type,
}: IAppServiceRestart): ReactElement {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  return (
    <Fragment>
      <ToggleButton
        onClick={() => setIsOpened(!isOpened)}
        offLabel="Restart"
        onLabel="Restart"
        className="service-button"
        checked={false}
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
