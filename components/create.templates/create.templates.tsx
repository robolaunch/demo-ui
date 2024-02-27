"use client";

import { ReactElement } from "react";
import Card from "../card/card.comp";
import useMain from "@/hooks/useMain";
import Image from "next/image";
import { FormikProps } from "formik";
import { ICreateEnvironmentForm } from "@/interfaces/create.interface";
import {
  templateDesktopViewer,
  templateDistroViewer,
} from "@/functions/environment.function";

interface ITemplates {
  formik: FormikProps<ICreateEnvironmentForm>;
}

export default function Templates({ formik }: ITemplates): ReactElement {
  const { templates } = useMain();

  return (
    <div className="grid grid-cols-3 gap-4">
      {templates
        .filter(
          (template) =>
            template.category === formik.values?.appConfig?.category,
        )
        .map((template, index) => {
          const selected =
            formik.values?.appConfig?.image?.distro === template.image.distro &&
            formik.values?.appConfig?.image?.desktop ===
              template.image.desktop &&
            formik.values?.appConfig?.image?.version ===
              template.image.version &&
            formik.values?.appConfig?.app?.name === template.app.name &&
            formik.values?.appConfig?.app?.version === template.app.version;

          return (
            <Card
              key={index}
              className={`transition-300 col-span-1 cursor-pointer p-4 hover:scale-105 hover:shadow-md ${selected && "border-primary-500 ring-2 ring-primary-200"}`}
              onClick={() => {
                formik.setValues({
                  ...formik.values,
                  appConfig: {
                    ...formik.values.appConfig,
                    image: {
                      distro: template.image.distro,
                      desktop: template.image.desktop,
                      version: template.image.version,
                    },
                    app: {
                      name: template.app.name,
                      version: template.app.version,
                    },
                  },
                });
              }}
            >
              <div className="hw-full flex gap-4">
                <Image
                  className="py-2"
                  width={92}
                  height={92}
                  objectFit="contain"
                  src={template.app.icon}
                  alt={template.app.name}
                />
                <div className="flex h-full flex-col justify-between text-sm">
                  <p className="font-medium">{template.app.alias}</p>
                  <p className="text-xs">
                    <span className=" font-medium">OS: </span>
                    {template.image.os}
                  </p>
                  <p className="text-xs">
                    <span className=" font-medium">Desktop: </span>
                    {templateDesktopViewer(template.image.desktop)}
                  </p>
                  <p className="text-xs">
                    <span className=" font-medium">Distro: </span>
                    {templateDistroViewer(template.image.distro)}
                  </p>
                  <p className="text-xs">
                    <span className=" font-medium">Version: </span>
                    {template.image.version}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
    </div>
  );
}
