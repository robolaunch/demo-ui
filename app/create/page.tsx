"use client";

import CreateTemplatesMapper from "@/components/create.templates.mapper/create.templates.mapper";
import { FormikProps, useFormik } from "formik";
import { ReactElement } from "react";
import { useRouter } from "next/navigation";
import { IEnvironment } from "@/interfaces/environment.interface";
import { environmentInitial } from "@/constants/environment.initial";
import CreateForm from "@/components/create.form/create.form";

export default function CreateApp(): ReactElement {
  const router = useRouter();

  const formik: FormikProps<IEnvironment> = useFormik<IEnvironment>({
    initialValues: environmentInitial as IEnvironment,
    onSubmit: async () => {
      formik.setSubmitting(true);
      setTimeout(() => router.push("/applications"), 1000);
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="hw-full grid grid-cols-12 gap-12"
    >
      <div className="hw-full col-span-9 flex flex-col gap-6 overflow-auto">
        {formik?.values?.applicationConfig?.application?.name ? (
          <CreateForm formik={formik} />
        ) : (
          <CreateTemplatesMapper formik={formik} />
        )}
      </div>
      <div className="hw-full col-span-3">
        <CreateForm formik={formik} />
      </div>
    </form>
  );
}
