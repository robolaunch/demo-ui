import { Dialog } from "primereact/dialog";
import { ReactElement } from "react";

interface IModal {
  children: ReactElement | ReactElement[];
  header: string;
  onClose: () => void;
}

export default function Modal({
  children,
  header,
  onClose,
}: IModal): ReactElement {
  return (
    <Dialog
      draggable={false}
      position="center"
      header={header}
      visible={true}
      onHide={onClose}
      style={{ width: "40vw" }}
      breakpoints={{ "960px": "75vw", "641px": "100vw" }}
    >
      {children}
    </Dialog>
  );
}
