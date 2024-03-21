"use client";

import React, { ReactElement, createContext, useEffect, useState } from "react";
import { environmentInitial } from "@/constants/environment.initial";
import { IEnvironment } from "@/interfaces/environment.interface";
import { ISavedTemplate } from "@/interfaces/template.interface";
import { createEnvironmentAPI } from "@/apis/environment.api";
import { IFilters } from "@/interfaces/create.interface";
import { getSavedTemplates } from "@/apis/template.api";
import { FormikProps, useFormik } from "formik";
import { useRouter } from "next/navigation";
import useMain from "@/hooks/useMain";
import * as Yup from "yup";

export const CreateContext: any = createContext<any>(null);

interface ICreateContext {
  children: ReactElement | ReactElement[];
}

// eslint-disable-next-line
export default ({ children }: ICreateContext) => {
  const [savedTemplates, setSavedTemplates] = useState<ISavedTemplate[]>([]);

  const [filters, setFilters] = useState<IFilters>({
    publisher: "all",
  });

  const router = useRouter();

  const { selectedState } = useMain();

  useEffect(() => {
    handleGetSavedTemplates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

      workspaces: Yup.array().of(
        Yup.object().shape({
          name: Yup.string().required("Workspace Name is required."),
          repos: Yup.array().of(
            Yup.object().shape({
              name: Yup.string().required("Name is required."),
              url: Yup.string().required("URL is required."),
              branch: Yup.string().required("Branch is required."),
            }),
          ),
        }),
      ),
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
        workspaces: formik.values.workspaces.map((workspace) => {
          return {
            name: workspace.name,
            workspaceDistro: "HUMBLE",
            robotRepositories: workspace.repos.map((repo) => {
              return {
                name: repo.name,
                url: repo.url,
                branch: repo.branch,
              };
            }),
          };
        }),
      });

      setTimeout(() => router.push("/applications"), 1000);
    },
  });

  useEffect(() => {
    console.log(formik.values);
  }, [formik.values]);

  async function handleGetSavedTemplates() {
    setSavedTemplates(
      await getSavedTemplates({
        orgId: selectedState?.organization?.id!,
        regionName: selectedState?.region?.name!,
        providerRegion: selectedState?.region?.region!,
        instanceId: selectedState?.instance?.id!,
        namespaceName: selectedState?.namespace?.name!,
      }),
    );
  }

  return (
    <CreateContext.Provider
      value={{
        formik,
        savedTemplates,
        filters,
        setFilters,
      }}
    >
      {children}
    </CreateContext.Provider>
  );
};
