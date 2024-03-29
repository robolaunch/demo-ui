"use client";

import Accordion from "@/components/Accordion/Accordion";
import { ReactElement } from "react";
import { FormikProps } from "formik";
import CFPort from "../CFPort/CFPort";
import { IEnvironment } from "@/interfaces/environment.interface";
import CFLabel from "../CFLabel/CFLabel";
import CFAccordionValidLabel from "../CFAccordionValidLabel/CFAccordionValidLabel";

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

  const hasErrors: boolean =
    formik.errors.services?.[type]?.customPorts?.length ?? 0 > 0 ? true : false;

  const hasValid: boolean = formik.values.services[type].customPorts.every(
    (port) => port.name && port.port && port.backendPort,
  );

  return (
    <Accordion
      headerClassName="text-sm"
      header={
        <div className="flex items-center justify-between">
          <p>Custom Ports Exposure From {typeView()}</p>
          <CFAccordionValidLabel
            type={hasErrors ? "error" : hasValid ? "valid" : null}
          />
        </div>
      }
    >
      <div className="hw-full flex flex-col gap-2">
        <p className="pb-2 text-slate-500">
          {(() => {
            switch (type) {
              case "ide":
                return "IDE is a code editor that is used to write and run code. You can expose custom ports to run your application on the IDE. For example, if you are running a web application, you can expose port 3000 to run your application on the IDE. ";
              case "vdi":
                return "VDI is a remote desktop that is used to run GUI applications. You can expose custom ports to run your application on the VDI. For example, if you are running a GUI application, you can expose port 5900 to run your application on the VDI. ";

              case "jupyterNotebook":
                return "Jupyter Notebook is an open-source web application that allows you to create and share documents that contain live code, equations, visualizations, and narrative text. You can expose custom ports to run your application on the Jupyter Notebook. For example, if you are running a web application, you can expose port 8888 to run your application on the Jupyter Notebook. ";
            }
          })()}
        </p>

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
