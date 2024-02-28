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
      className={`transition-300 h-11 border-primary-300 bg-primary-500 text-sm hover:bg-primary-700 ${className}`}
      disabled={disabled}
      loading={loading}
      label={label}
      type={type}
      onClick={onClick}
    />
  );
}
