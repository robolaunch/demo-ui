import { ReactElement, useEffect, useState } from "react";
import Card from "../card/card.comp";
import { FormikProps } from "formik";
import { ICreateEnvironmentForm } from "@/interfaces/create.interface";
import useMain from "@/hooks/useMain";
import { ITemplate } from "@/interfaces/template.interface";
import Image from "next/image";
import {
  templateDesktopViewer,
  templateDistroViewer,
} from "@/functions/environment.function";

interface ICreateSelectedTemplateCard {
  formik: FormikProps<ICreateEnvironmentForm>;
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
          template.image.distro === formik.values?.appConfig?.image?.distro &&
          template.image.desktop === formik.values?.appConfig?.image?.desktop &&
          template.image.version === formik.values?.appConfig?.image?.version &&
          template.app.name === formik.values?.appConfig?.app?.name &&
          template.app.version === formik.values?.appConfig?.app?.version,
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
