import { ReactElement } from "react";
import { InputText as InputTextPR } from "primereact/inputtext";

interface IInputText {
  formikProps: any;
  label: string;
  touched?: boolean;
  error?: string;
}

export default function InputText({
  formikProps,
  label,
  touched,
  error,
}: IInputText): ReactElement {
  return (
    <div className="flex w-full flex-col gap-2">
      <span className="p-float-label text-sm">
        <InputTextPR className="h-10 w-full !text-xs" {...formikProps} />
        <label>{label}</label>
      </span>
      <span
        style={{
          visibility: touched && error ? "visible" : "hidden",
        }}
        className="transition-300 mx-auto text-[0.68rem] text-red-500"
      >
        {error}
      </span>
    </div>
  );
}
