import { ReactElement, useEffect, useState } from "react";
import Card from "../card/card.comp";
import { FormikProps } from "formik";
import useMain from "@/hooks/useMain";
import { ITemplate } from "@/interfaces/template.interface";
import Image from "next/image";
import {
  templateDesktopViewer,
  templateDistroViewer,
} from "@/functions/environment.function";
import { IEnvironment } from "@/interfaces/environment.interface";

interface ICreateSelectedTemplateCard {
  formik: FormikProps<IEnvironment>;
}

export default function CreateSelectedTemplateCard({
  formik,
}: ICreateSelectedTemplateCard): ReactElement {
  const [selectedTemplate, setSelectedTemplate] = useState<ITemplate>();

  const { templates } = useMain();

  useEffect(() => {
    setSelectedTemplate(
      templates.find(
        (template) =>
          template.app.name ===
            formik.values.applicationConfig.application.name &&
          template.app.version ===
            formik.values.applicationConfig.application.version &&
          template.image.desktop ===
            formik.values.applicationConfig.devspace.desktop &&
          template.image.distro ===
            formik.values.applicationConfig.devspace.ubuntuDistro &&
          template.image.version ===
            formik.values.applicationConfig.devspace.version,
      ),
    );
  }, [templates, formik.values]);

  return (
    <Card
      className={`flex !h-fit cursor-pointer flex-col items-center justify-between p-4 text-sm`}
    >
      <div className="flex flex-col items-center ">
        <Image
          className="py-2"
          width={64}
          height={64}
          src={selectedTemplate?.app?.icon! || "/icons/rocket.svg"}
          alt="template"
        />
        <p className="text-sm font-medium">{selectedTemplate?.app?.alias}</p>
        <p className="font-base text-xs">
          {selectedTemplate?.image?.os
            ? `
            ${selectedTemplate?.image?.os} ${templateDistroViewer(
              selectedTemplate?.image?.distro!,
            )} - ${templateDesktopViewer(selectedTemplate?.image?.desktop!)}
            `
            : "None Selected Application"}
        </p>
      </div>
    </Card>
  );
}
