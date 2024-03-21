"use client";

import { RadioButton } from "primereact/radiobutton";
import { ReactElement } from "react";

interface IInputRadio {
  label: string;
  checked?: boolean;
  onChange?: () => void;
}

export default function InputRadio({
  label,
  checked,
  onChange,
}: IInputRadio): ReactElement {
  return (
    <div className="flex items-center gap-2">
      <RadioButton
        className="scale-90"
        inputId="ingredient3"
        name="Plain"
        value="Plain"
        checked={checked}
        onChange={onChange}
      />
      <label onClick={onChange} className="cursor-pointer text-sm">
        {label}
      </label>
    </div>
  );
}
