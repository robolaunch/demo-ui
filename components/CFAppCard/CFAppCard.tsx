import { Fragment, ReactElement } from "react";
import Card from "../Card/Card";
import { ITemplate } from "@/interfaces/template.interface";
import useCreate from "@/hooks/useCreate";
import Image from "next/image";
import {
  templateDesktopViewer,
  templateDistroViewer,
} from "@/functions/environment.function";
import { MdVerified } from "react-icons/md";
import { Tooltip } from "primereact/tooltip";
import { TbWorld } from "react-icons/tb";
import useMain from "@/hooks/useMain";
import { PiUsersThreeBold } from "react-icons/pi";

interface ICFAppCard {
  template: ITemplate;
}

export default function CFAppCard({ template }: ICFAppCard): ReactElement {
  const { formik } = useCreate();

  const { selectedState } = useMain();

  return (
    <Card
      className={`transition-300 col-span-1 cursor-pointer border p-4 hover:scale-95 hover:shadow-md ${!template.env ? "border-primary-200 bg-primary-100" : "border-secondary-300 bg-secondary-100"} bg-opacity-15`}
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
      <div className="hw-full flex gap-4">
        <Image
          className="py-2"
          width={92}
          height={92}
          style={{
            objectFit: "contain",
          }}
          src={template.app.icon}
          alt={template.app.name}
        />
        <div className="flex h-full flex-col justify-between text-sm">
          <p className="flex items-center gap-2 font-medium">
            {template.app.alias}
            {!template.env ? (
              <Fragment>
                <Tooltip
                  target=".verified-robolaunch"
                  position="top"
                  content="This Image created by robolaunch"
                />
                <MdVerified
                  size={16}
                  className="verified-robolaunch text-primary-600"
                />
              </Fragment>
            ) : template.env.sharing.public ? (
              <Fragment>
                <Tooltip
                  target=".verified-public"
                  position="top"
                  content="This Image created by robolaunch users."
                />
                <TbWorld
                  size={16}
                  className="verified-public text-secondary-600"
                />
              </Fragment>
            ) : template.env.sharing.organization ? (
              <Fragment>
                <Tooltip
                  target=".verified-org"
                  position="top"
                  content={`This Image created by your ${selectedState?.organization?.name?.split("_")?.[1]} organization`}
                />
                <PiUsersThreeBold
                  size={16}
                  className="verified-org text-secondary-600"
                />
              </Fragment>
            ) : (
              template.env.sharing.private && (
                <Fragment>
                  <Tooltip
                    target=".verified-user"
                    position="top"
                    content="This Image created by you."
                  />
                  <MdVerified
                    size={16}
                    className="verified-user text-secondary-600"
                  />
                </Fragment>
              )
            )}
          </p>
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
          {template.env && (
            <p className="text-xs">
              <span className=" font-medium">Template Name: </span>
              {template.env.sharing.alias}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}
