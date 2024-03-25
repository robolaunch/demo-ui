import { ReactElement } from "react";
import { ToggleButton as ToggleButtonPR } from "primereact/togglebutton";

interface IToggleButton {
  checked: boolean;
  onClick: () => void;
  onLabel: string;
  offLabel: string;
  className?: string;
}

export default function ToggleButton({
  checked,
  onClick,
  onLabel,
  offLabel,
  className,
}: IToggleButton): ReactElement {
  return (
    <ToggleButtonPR
      className={className}
      checked={checked}
      onClick={onClick}
      onLabel={onLabel}
      offLabel={offLabel}
    />
  );
}
