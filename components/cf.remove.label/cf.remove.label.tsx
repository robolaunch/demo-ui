import { ReactElement } from "react";

interface ICFLabel {
  type: "remove" | "add";
  label: string;
  onClick?: () => void;
}

export default function CFLabel({
  type,
  label,
  onClick,
}: ICFLabel): ReactElement {
  return (
    <span
      onClick={onClick}
      className={`cursor-pointer pt-4 text-center text-xs  underline ${
        type === "add" ? "text-primary-500" : "text-red-500"
      }`}
    >
      {label}
    </span>
  );
}
