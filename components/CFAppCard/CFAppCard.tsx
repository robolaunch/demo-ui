import { ReactElement } from "react";
import Card from "../Card/Card";
import { ITemplate } from "@/interfaces/template.interface";
import useCreate from "@/hooks/useCreate";
import {
  templateDesktopViewer,
  templateDistroViewer,
} from "@/functions/environment.function";
import CFAppCardImage from "../CFAppCardImage/CFAppCardImage";
import CFAppCardTitle from "../CFAppCardTitle/CFAppCardTitle";

interface ICFAppCard {
  template: ITemplate;
}

export default function CFAppCard({ template }: ICFAppCard): ReactElement {
  const { formik } = useCreate();

  return (
    <Card
      className={`transition-300 !h-72 !w-[21rem] cursor-pointer border p-4  hover:scale-[0.975] hover:shadow-sm ${!template.env ? "border-primary-200 bg-primary-100" : "border-secondary-300 bg-secondary-100"}`}
      onClick={() => {
        formik.setValues({
          ...formik.values,
          applicationConfig: {
            ...formik.values.applicationConfig,
            application: {
              ...formik.values.applicationConfig.application,
              name: template?.app?.name,
              version: template?.app?.version,
            },
            devspace: {
              ...formik.values.applicationConfig.devspace,
              desktop: template?.image?.desktop,
              ubuntuDistro: template?.image?.distro,
              version: template?.image?.version,
            },
          },
        });

        template.env &&
          formik.setValues({
            ...template.env,

            sharing: {
              alias: "",
              organization: false,
              public: false,
              private: false,
            },
          });
      }}
    >
      <div className="hw-full flex flex-col">
        <CFAppCardImage template={template} />
        <div className="flex h-full flex-col items-center justify-between p-2 text-sm">
          <CFAppCardTitle template={template} />
          <div className="flex w-full flex-col gap-2 p-2">
            <p className="flex w-full justify-between text-xs">
              <span className=" font-medium">OS: </span>
              {template.image.os}
            </p>
            <p className="flex w-full justify-between text-xs">
              <span className=" font-medium">Desktop: </span>
              {templateDesktopViewer(template.image.desktop)}
            </p>
            <p className="flex w-full justify-between text-xs">
              <span className=" font-medium">Distro: </span>
              {templateDistroViewer(template.image.distro)}
            </p>
            <p className="flex w-full justify-between text-xs">
              <span className=" font-medium">Version: </span>
              {template.image.version}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
