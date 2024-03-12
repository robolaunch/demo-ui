import Accordion from "@/app/accordion/accordion.comp";
import InputText from "../input.text/input.text.comp";
import { ReactElement } from "react";
import { FormikProps } from "formik";
import { ICreateEnvironmentForm } from "@/interfaces/create.interface";
import CFRemoveLabel from "../cf.remove.label/cf.remove.label";
import { IEnvironment } from "@/interfaces/environment.interface";

interface ICFPort {
  formik: FormikProps<IEnvironment>;
  type: "ide" | "vdi" | "jupyterNotebook";
  index: number;
}

export default function CFPort({ formik, type, index }: ICFPort): ReactElement {
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
    <Accordion headerClassName="text-sm" header={`IDE Port #${index}`}>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 py-3">
          <InputText
            label="Port Name"
            formikProps={null}
            minLength={4}
            maxLength={4}
            required
          />
          <InputText type="number" label="App Port" formikProps={null} />
          <InputText
            type="number"
            label="Node Port"
            formikProps={null}
            disabled
            value="3000"
          />
        </div>
        <CFRemoveLabel label={`Remove ${typeView()} Port #${index}`} />
      </div>
    </Accordion>
  );
}
