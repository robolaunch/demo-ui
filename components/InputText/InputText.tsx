"use client";

import { ReactElement } from "react";
import { InputText as InputTextPR } from "primereact/inputtext";

interface IInputText {
  formikProps?: any;
  label: string;
  touched?: boolean;
  error?: string;
  disabled?: boolean;
  value?: string;
  classNameInput?: string;
  type?: string;
  minLength?: number;
  maxLength?: number;
  required?: boolean;
  tooltip?: string;
}

export default function InputText({
  formikProps,
  label,
  touched,
  error,
  disabled,
  value,
  classNameInput,
  type,
  minLength,
  maxLength,
  required,
  tooltip,
}: IInputText): ReactElement {
  return (
    <div className="relative w-full">
      <div className="flex w-full flex-col gap-2">
        <span className="p-float-label relative text-sm">
          <InputTextPR
            required={required}
            type={type || "text"}
            minLength={minLength}
            maxLength={maxLength}
            className={`h-10 w-full !text-xs ${classNameInput} ${disabled && "cursor-not-allowed"}`}
            disabled={disabled}
            value={value}
            {...formikProps}
            tooltip={tooltip}
          />
          <label>{label}</label>
        </span>
      </div>
      {touched && error && (
        <span className="transition-300 absolute -bottom-6 left-1/2 mx-auto -translate-x-1/2 transform text-[0.68rem] text-red-500">
          {error}
        </span>
      )}
    </div>
  );
}
