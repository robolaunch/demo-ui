import { Fragment, ReactElement } from "react";
import Categories from "../create.categories/create.categories";
import Templates from "../create.templates/create.templates";
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
