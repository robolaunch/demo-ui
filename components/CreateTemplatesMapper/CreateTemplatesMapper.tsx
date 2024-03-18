import { Fragment, ReactElement } from "react";
import Categories from "../CreateCategories/CreateCategories";
import Templates from "../CreateTemplates/CreateTemplates";
import { FormikProps } from "formik";
import { IEnvironment } from "@/interfaces/environment.interface";

interface ICreateTemplatesMapper {
  formik: FormikProps<IEnvironment>;
}

export default function CreateTemplatesMapper({
  formik,
}: ICreateTemplatesMapper): ReactElement {
  return (
    <Fragment>
      <Categories formik={formik} />
      <Templates formik={formik} />
    </Fragment>
  );
}
