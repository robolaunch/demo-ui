"use client";

import CreateTemplatesMapper from "@/components/create.templates.mapper/create.templates.mapper";
import { FormikProps, useFormik } from "formik";
import { ReactElement, useEffect } from "react";
import { useRouter } from "next/navigation";
import { IEnvironment } from "@/interfaces/environment.interface";
import { environmentInitial } from "@/constants/environment.initial";
import CreateForm from "@/components/CreateForm/CreateForm";
import PreviewForm from "@/components/PreviewForm.tsx/PreviewForm";
import * as Yup from "yup";

export default function CreateApp(): ReactElement {
  const router = useRouter();

  const formik: FormikProps<IEnvironment> = useFormik<IEnvironment>({
    initialValues: environmentInitial as IEnvironment,
    validationSchema: Yup.object().shape({
      details: Yup.object().shape({
        name: Yup.string().required("Application Name is required."),
      }),

      directories: Yup.object().shape({
        hostDirectories: Yup.array().of(
          Yup.object().shape({
            hostDirectory: Yup.string().required("Host Path is required."),
            mountPath: Yup.string().required("Mount Path is required."),
          }),
        ),
      }),

      services: Yup.object().shape({
        ide: Yup.object().shape({
          isEnabled: Yup.boolean(),
          customPorts: Yup.array().of(
            Yup.object().shape({
              name: Yup.string().required("Port Name is required."),
              port: Yup.number().required("Port is required"),
              backendPort: Yup.number().required("Backend Port is required."),
            }),
          ),
        }),
        vdi: Yup.object().shape({
          isEnabled: Yup.boolean(),
          customPorts: Yup.array().of(
            Yup.object().shape({
              name: Yup.string().required("Port Name is required."),
              port: Yup.number().required("Port is required"),
              backendPort: Yup.number().required("Backend Port is required."),
            }),
          ),
        }),
        jupyterNotebook: Yup.object().shape({
          isEnabled: Yup.boolean(),
          customPorts: Yup.array().of(
            Yup.object().shape({
              name: Yup.string().required("Port Name is required."),
              port: Yup.number().required("Port is required"),
              backendPort: Yup.number().required("Backend Port is required."),
            }),
          ),
        }),
      }),
    }),
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
