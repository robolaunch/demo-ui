import Accordion from "@/app/accordion/accordion.comp";
import InputText from "../input.text/input.text.comp";
import { ReactElement } from "react";
import { FormikProps } from "formik";
import { ICreateEnvironmentForm } from "@/interfaces/create.interface";
import CFRemoveLabel from "../cf.remove.label/cf.remove.label";

interface ICFHostDirectory {
  formik: FormikProps<ICreateEnvironmentForm>;
  index: number;
}

export default function CFHostDirectory({
  formik,
  index,
}: ICFHostDirectory): ReactElement {
  return (
    <Accordion headerClassName="text-sm" header={`Host Directory #${index}`}>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 py-3">
          <InputText label="Host Path" formikProps={null} />
          <InputText label="Mount Path" formikProps={null} />
        </div>
        <CFRemoveLabel label="Remove Host Directory" />
      </div>
    </Accordion>
  );
}
