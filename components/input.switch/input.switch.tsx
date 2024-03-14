import { ReactElement } from "react";
import {
  InputSwitchChangeEvent,
  InputSwitch as InputSwitchPR,
} from "primereact/inputswitch";

interface IInputSwitch {
  label: string;
  checked: boolean;
  disabled?: boolean;
  tooltip?: string;
  onChange?: (e: InputSwitchChangeEvent) => void;
  formikProps?: any;
}

export default function InputSwitch({
  label,
  checked,
  disabled,
  tooltip,
  onChange,
  formikProps,
}: IInputSwitch): ReactElement {
  return (
    <div className="flex items-center justify-between gap-1 text-sm">
      <label className="w-32">{label}</label>
      <InputSwitchPR
        className="scale-75"
        checked={checked}
        disabled={disabled}
        tooltip={tooltip}
        onChange={onChange}
        {...formikProps}
      />
    </div>
  );
}
