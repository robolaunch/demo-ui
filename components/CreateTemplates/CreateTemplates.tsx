"use client";

import { ReactElement } from "react";
import useMain from "@/hooks/useMain";
import useCreate from "@/hooks/useCreate";
import { templateFinder } from "@/functions/template.function";
import { ITemplate } from "@/interfaces/template.interface";
import CFAppCard from "../CFAppCard/CFAppCard";

export default function Templates(): ReactElement {
  const { savedTemplates, formik } = useCreate();

  const { templates } = useMain();

  return (
    <div className="grid grid-cols-3 gap-4">
      {[
        ...templates,

        ...(savedTemplates.map((temp) => {
          return templateFinder(temp.template, templates);
        }) as ITemplate[]),
      ]
        .filter(
          (template) =>
            template.category === formik.values?.applicationConfig?.domainName,
        )
        .map((template, index) => (
          <CFAppCard key={index} template={template} />
        ))}
    </div>
  );
}
