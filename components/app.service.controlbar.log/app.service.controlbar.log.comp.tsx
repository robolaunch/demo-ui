import { ToggleButton } from "primereact/togglebutton";
import { Fragment, ReactElement, useState } from "react";
import Modal from "../modal/modal.comp";
import useApp from "@/hooks/useApp";
import { LazyLog } from "@melloware/react-logviewer";

interface IServiceLog {
  type: "ide" | "vdi";
}

export default function ServiceLog({ type }: IServiceLog): ReactElement {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const { appData } = useApp();

  return (
    <Fragment>
      <ToggleButton
        onClick={() => setIsOpened(!isOpened)}
        offLabel="Logs"
        className="w-32 text-xs"
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
