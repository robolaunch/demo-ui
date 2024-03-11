import { IoCloseCircleOutline } from "react-icons/io5";
import { ReactElement } from "react";

interface ICFRemoveButton {
  size?: number;
  onClick?: () => void;
}

export default function CFRemoveButton({
  onClick,
}: ICFRemoveButton): ReactElement {
  return (
    <IoCloseCircleOutline
      size={24}
      className="transition-300 cursor-pointer text-red-500 hover:scale-110"
      onClick={onClick}
    />
  );
}
