import Accordion from "@/app/accordion/accordion.comp";
import { ReactElement } from "react";
import { FormikProps } from "formik";
import CFPort from "../cf.port/cf.port";
import { IEnvironment } from "@/interfaces/environment.interface";
import CFLabel from "../cf.remove.label/cf.remove.label";

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
      <div className="hw-full flex flex-col gap-2">
        {formik.values.services[type].customPorts.map((_, index) => (
          <CFPort key={index} index={index} formik={formik} type={type} />
        ))}
        <CFLabel
          type="add"
          label={`Add Custom Port to ${typeView()}`}
          onClick={() => {
            formik.setFieldValue(`services.${type}.customPorts`, [
              ...formik.values.services[type].customPorts,
              { name: "", port: "", backendPort: "" },
            ]);
          }}
        />
      </div>
    </Accordion>
  );
}
