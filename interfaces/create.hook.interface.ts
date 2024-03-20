import { FormikProps } from "formik";
import { IEnvironment } from "./environment.interface";
import { ISavedTemplate } from "./template.interface";

export interface ICreateHook {
  formik: FormikProps<IEnvironment>;
  savedTemplates: ISavedTemplate[];
}
