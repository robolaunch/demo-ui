import { Fragment, ReactElement, useState } from "react";
import Modal from "../Modal/Modal";
import useApp from "@/hooks/useApp";
import { LazyLog } from "@melloware/react-logviewer";
import ToggleButton from "../ToggleButton/ToggleButton";

interface IAppServiceLog {
  type: "ide" | "vdi";
}

export default function AppServiceLog({ type }: IAppServiceLog): ReactElement {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const { appData } = useApp();

  return (
    <Fragment>
      <ToggleButton
        className="service-button"
        onClick={() => setIsOpened(!isOpened)}
        offLabel="Logs"
        onLabel="Logs"
        checked={false}
      />
      {isOpened && (
        <Modal
          header="Logs"
          onClose={() => setIsOpened(false)}
          style={{ width: "90vw", height: "90vh" }}
        >
          <LazyLog
            text={appData?.services?.[`${type}`]?.log}
            height={752}
            scrollToLine={9999999}
          />
        </Modal>
      )}
    </Fragment>
  );
}
