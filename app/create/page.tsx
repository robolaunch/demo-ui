"use client";

import CreateTemplatesMapper from "@/components/CreateTemplatesMapper/CreateTemplatesMapper";
import { FormikProps, useFormik } from "formik";
import { ReactElement, useEffect } from "react";
import { useRouter } from "next/navigation";
import { IEnvironment } from "@/interfaces/environment.interface";
import { environmentInitial } from "@/constants/environment.initial";
import CreateForm from "@/components/CreateForm/CreateForm";
import PreviewForm from "@/components/PreviewForm.tsx/PreviewForm";
import * as Yup from "yup";
import { createEnvironmentAPI } from "@/apis/environment.api";
import useMain from "@/hooks/useMain";

export default function CreateApp(): ReactElement {
  const router = useRouter();

  const { selectedState } = useMain();

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

      sharing: Yup.object().shape({
        alias: Yup.string().required("Template Name is required."),
      }),
    }),
    onSubmit: async () => {
      formik.setSubmitting(true);

      await createEnvironmentAPI({
        orgId: selectedState?.organization?.id!,
        regionName: selectedState?.region?.name!,
        providerRegion: selectedState?.region?.region!,
        instanceId: selectedState?.instance?.id!,
        namespaceName: selectedState?.namespace?.name!,
        appName: formik.values.details.name,
        repository: {
          url: undefined,
          branch: "",
        },
        vdiEnabled: formik.values.services.vdi.isEnabled,
        jupyterNotebookEnabled:
          formik.values.services.jupyterNotebook.isEnabled,
        appConfig: {
          domainName: formik.values.applicationConfig.domainName,
          application: {
            name: formik.values.applicationConfig.application.name,
            version: formik.values.applicationConfig.application.version,
          },
          devspace: {
            desktop: formik.values.applicationConfig.devspace.desktop,
            ubuntuDistro: formik.values.applicationConfig.devspace.ubuntuDistro,
            version: formik.values.applicationConfig.devspace.version,
          },
        },
        customPorts: {
          ide:
            formik.values.services.ide.customPorts
              ?.map((port) => {
                return `${port.name}-${port.backendPort}:${port.port}`;
              })
              ?.join("/") || "",
          vdi:
            formik.values.services.vdi.customPorts
              ?.map((port) => {
                return `${port.name}-${port.backendPort}:${port.port}`;
              })
              ?.join("/") || "",
          jupyterNotebook:
            formik.values.services.jupyterNotebook.customPorts
              ?.map((port) => {
                return `${port.name}-${port.backendPort}:${port.port}`;
              })
              ?.join("/") || "",
        },
        directories: {
          hostDirectories: "",
          permittedDirectories:
            formik.values.directories.permittedDirectories?.join(":"),
          persistentDirectories:
            formik.values.directories.persistentDirectories?.join(":"),
        },
        sharing: {
          alias: formik.values.sharing.alias,
          template: JSON.stringify(formik.values),
          private: formik.values.sharing.private,
          organization: formik.values.sharing.organization,
          public: formik.values.sharing.public,
        },
      });

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
