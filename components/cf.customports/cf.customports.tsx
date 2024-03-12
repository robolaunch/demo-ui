import { ICreateEnvironmentForm } from "@/interfaces/create.interface";
import Accordion from "@/app/accordion/accordion.comp";
import { ReactElement } from "react";
import { FormikProps } from "formik";
import CFPort from "../cf.port/cf.port";
import { IEnvironment } from "@/interfaces/environment.interface";

interface ICFCustomPorts {
  formik: FormikProps<IEnvironment>;
  type: "ide" | "vdi" | "jupyterNotebook";
}

export default function CFCustomPorts({
  formik,
  type,
}: ICFCustomPorts): ReactElement {
  function typeView(): string {
    switch (type) {
      case "ide":
        return "IDE";
      case "vdi":
        return "VDI";
      case "jupyterNotebook":
        return "Jupyter Notebook";
    }
  }

  return (
    <Accordion
      headerClassName="text-sm"
      header={`Custom Ports Exposure From ${typeView()}`}
    >
      <CFPort type={type} index={1} formik={formik} />
      <CFPort type={type} index={2} formik={formik} />
    </Accordion>
  );
}
