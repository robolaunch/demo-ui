import { Dialog } from "primereact/dialog";
import { ReactElement } from "react";

interface IModal {
  children: ReactElement | ReactElement[];
  header: string;
  onClose: () => void;
  style?: object;
}

export default function Modal({
  children,
  header,
  onClose,
  style,
}: IModal): ReactElement {
  return (
    <Dialog
      draggable={false}
      position="center"
      header={header}
      visible={true}
      onHide={onClose}
      style={style ? style : { width: "40vw" }}
      breakpoints={{ "960px": "75vw", "641px": "100vw" }}
    >
      {children}
    </Dialog>
  );
}
