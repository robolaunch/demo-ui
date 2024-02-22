import { ReactElement } from "react";
import { Button as ButtonPR } from "primereact/button";

interface IButton {
  label: string;
  type: "submit" | "reset" | "button";
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export default function Button({
  label,
  type,
  loading,
  disabled,
  onClick,
}: IButton): ReactElement {
  return (
    <ButtonPR
      className="h-11 text-sm"
      disabled={disabled}
      loading={loading}
      label={label}
      type={type}
      onClick={onClick}
    />
  );
}
