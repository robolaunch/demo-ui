import { ReactElement } from "react";
import { InputText as InputTextPR } from "primereact/inputtext";

interface IInputText {
  formikProps: any;
  label: string;
}

export default function InputText({
  formikProps,
  label,
}: IInputText): ReactElement {
  return (
    <span className="p-float-label text-sm">
      <InputTextPR className="h-10 w-full !text-xs" {...formikProps} />
      <label>{label}</label>
    </span>
  );
}
