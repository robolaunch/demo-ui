import { Fragment, ReactElement } from "react";
import Categories from "../create.categories/create.categories";
import Templates from "../create.templates/create.templates";
import { FormikProps } from "formik";
import { ICreateEnvironmentForm } from "@/interfaces/create.interface";

interface ICreateTemplatesMapper {
  formik: FormikProps<ICreateEnvironmentForm>;
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
