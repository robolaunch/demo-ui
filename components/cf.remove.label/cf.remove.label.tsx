import { ReactElement } from "react";

interface ICFRemoveLabel {
  label: string;
  onClick?: () => void;
}

export default function CFRemoveLabel({
  label,
  onClick,
}: ICFRemoveLabel): ReactElement {
  return (
    <p
      onClick={onClick}
      className="cursor-pointer text-center text-xs text-red-500 underline"
    >
      {label || "Remove"}
    </p>
  );
}
