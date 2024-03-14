"use client";

import CreateTemplatesMapper from "@/components/create.templates.mapper/create.templates.mapper";
import { FormikProps, useFormik } from "formik";
import { ReactElement, useEffect } from "react";
import { useRouter } from "next/navigation";
import { IEnvironment } from "@/interfaces/environment.interface";
import { environmentInitial } from "@/constants/environment.initial";
import CreateForm from "@/components/CreateForm/CreateForm";
import PreviewForm from "@/components/PreviewForm.tsx/PreviewForm";

export default function CreateApp(): ReactElement {
  const router = useRouter();

  const formik: FormikProps<IEnvironment> = useFormik<IEnvironment>({
    initialValues: environmentInitial as IEnvironment,
    onSubmit: async () => {
      formik.setSubmitting(true);
      setTimeout(() => router.push("/applications"), 1000);
    },
  });

  useEffect(() => {
    console.log(formik.values);
  }, [formik.values]);

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="hw-full grid grid-cols-12 gap-12"
    >
      <div
        className={`hw-full  flex flex-col gap-6 overflow-auto ${formik.values.applicationConfig.application.name ? "col-span-8" : "col-span-full"}`}
      >
        {formik?.values?.applicationConfig?.application?.name ? (
          <CreateForm formik={formik} />
        ) : (
          <CreateTemplatesMapper formik={formik} />
        )}
      </div>
      {formik.values.applicationConfig.application.name && (
        <div className="hw-full col-span-4 overflow-auto">
          <PreviewForm formik={formik} />
        </div>
      )}
    </form>
  );
}
