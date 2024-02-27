import { ReactElement } from "react";
import { Button as ButtonPR } from "primereact/button";

interface IButton {
  label: string;
  type: "submit" | "reset" | "button";
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

export default function Button({
  label,
  type,
  loading,
  disabled,
  onClick,
  className,
}: IButton): ReactElement {
  return (
    <ButtonPR
      className={`bg-primary-500 border-primary-300 h-11 text-sm ${className}`}
      disabled={disabled}
      loading={loading}
      label={label}
      type={type}
      onClick={onClick}
    />
  );
}
