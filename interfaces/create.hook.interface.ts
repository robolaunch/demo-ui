import { FormikProps } from "formik";
import { IEnvironment } from "./environment.interface";
import { ISavedTemplate } from "./template.interface";
import { IFilters } from "./create.interface";
import { Dispatch, SetStateAction } from "react";

export interface ICreateHook {
  formik: FormikProps<IEnvironment>;
  savedTemplates: ISavedTemplate[];
  filters: IFilters;
  setFilters: Dispatch<SetStateAction<IFilters>>;
}
