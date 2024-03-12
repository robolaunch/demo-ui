"use client";

import CreateTemplatesMapper from "@/components/create.templates.mapper/create.templates.mapper";
import { FormikProps, useFormik } from "formik";
import { ReactElement } from "react";
import CreateSidebar from "@/components/create.sidebar/create.sidebar";
import useMain from "@/hooks/useMain";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { IEnvironment } from "@/interfaces/environment.interface";
import { environmentInitial } from "@/constants/environment.initial";

export default function CreateApp(): ReactElement {
  const { selectedState } = useMain();

  const router = useRouter();

  const formik: FormikProps<IEnvironment> = useFormik<IEnvironment>({
    initialValues: environmentInitial as IEnvironment,
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Application name is required."),
      appConfig: Yup.object().shape({
        image: Yup.object().shape({
          distro: Yup.string().required("Application is required."),
        }),
      }),
    }),
    onSubmit: async () => {
      formik.setSubmitting(true);
      // await createEnvironmentAPI({
      //   orgId: selectedState?.organization?.id!,
      //   regionName: selectedState?.region?.name!,
      //   providerRegion: selectedState?.region?.region!,
      //   instanceId: selectedState?.instance?.id!,
      //   namespaceName: selectedState?.namespace?.name!,
      //   appName: formik.values.name,
      //   ideEnabled: formik.values.ideEnabled,
      //   vdiEnabled: formik.values.vdiEnabled,
      //   jupyterNotebookEnabled: formik.values.jupyterNotebookEnabled,
      //   appConfig: {
      //     app: formik.values.appConfig.app,
      //     category: formik.values.appConfig.category,
      //     image: {
      //       desktop: formik.values.appConfig.image.desktop,
      //       distro: formik.values.appConfig.image.distro,
      //       version: formik.values.appConfig.image.version,
      //     },
      //   },
      //   repoURL: formik.values.repoURL as string,
      //   repoBranch: formik.values.repoBranch as string,
      // });

      setTimeout(() => router.push("/applications"), 1000);
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="hw-full grid grid-cols-12 gap-12"
    >
      <div className="hw-full col-span-8 flex flex-col gap-6">
        <CreateTemplatesMapper formik={formik} />
      </div>
      <div className="hw-full col-span-4">
        <CreateSidebar formik={formik} />
      </div>
    </form>
  );
}
