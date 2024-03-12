import { ICreateEnvironmentForm } from "@/interfaces/create.interface";
import Accordion from "@/app/accordion/accordion.comp";
import { ReactElement } from "react";
import { FormikProps } from "formik";
import CFHostDirectory from "../cf.hostdirectory/cf.hostdirectory";
import { IEnvironment } from "@/interfaces/environment.interface";

interface ICFHostDirectories {
  formik: FormikProps<IEnvironment>;
}

export default function CFHostDirectories({
  formik,
}: ICFHostDirectories): ReactElement {
  return (
    <Accordion header="Host Directories">
      <CFHostDirectory index={1} formik={formik} />
      <CFHostDirectory index={2} formik={formik} />
    </Accordion>
  );
}
