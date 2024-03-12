import { ReactElement } from "react";
import { Button as ButtonPR } from "primereact/button";

interface IButton {
  label: string;
  type: "submit" | "reset" | "button";
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  model?: "primary" | "secondary";
}

export default function Button({
  label,
  type,
  loading,
  disabled,
  onClick,
  className,
  model,
}: IButton): ReactElement {
  const models = {
    primary: "bg-primary-500 hover:bg-primary-700 border-primary-300 text-sm",
    secondary:
      "bg-white hover:bg-primary-50 text-primary-500 border-primary-500 text-sm ",
  };

  return (
    <ButtonPR
      className={`transition-300 h-11  ${className} ${model && models?.[model]}`}
      disabled={disabled}
      loading={loading}
      label={label}
      type={type}
      onClick={onClick}
    />
  );
}
