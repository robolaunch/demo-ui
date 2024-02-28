import { ReactElement } from "react";
import { InputSwitch as InputSwitchPR } from "primereact/inputswitch";

interface IInputSwitch {
  label: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (e: any) => void;
  formikProps?: any;
}

export default function InputSwitch({
  label,
  checked,
  formikProps,
}: IInputSwitch): ReactElement {
  return (
    <div className="flex items-center justify-between gap-1 text-sm">
      <label className="w-32">{label}</label>
      <InputSwitchPR className="scale-75" checked={checked} {...formikProps} />
    </div>
  );
}
