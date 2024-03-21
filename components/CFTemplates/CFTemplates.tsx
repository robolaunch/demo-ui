"use client";

import { templateFinder } from "@/functions/template.function";
import { ITemplate } from "@/interfaces/template.interface";
import CFAppCard from "../CFAppCard/CFAppCard";
import CFFilter from "../CFFilter/CFFilter";
import useCreate from "@/hooks/useCreate";
import useMain from "@/hooks/useMain";
import { ReactElement } from "react";

export default function CFTemplates(): ReactElement {
  const { savedTemplates, formik, filters } = useCreate();

  const { templates } = useMain();

  return (
    <div className="hw-full relative flex gap-4">
      <CFFilter />
      <div className="grid w-full grid-cols-3 gap-4">
        {(() => {
          const filteredTemplates = [
            ...templates,

            ...(savedTemplates.map((temp) => {
              return templateFinder(temp.template, templates);
            }) as ITemplate[]),
          ]
            .filter(
              (template) =>
                template?.category ===
                formik.values?.applicationConfig?.domainName,
            )
            .filter((template) => {
              if (filters.publisher === "all") {
                return template;
              }

              if (filters.publisher === "verified" && !template.env) {
                return template;
              }

              if (
                filters.publisher === "public" &&
                template.env?.sharing.public
              ) {
                return template;
              }

              if (
                filters.publisher === "organization" &&
                template.env?.sharing.organization &&
                !template.env.sharing.public
              ) {
                return template;
              }

              if (
                filters.publisher === "private" &&
                template.env?.sharing.private &&
                !template.env.sharing.organization
              ) {
                return template;
              }
            });

          return filteredTemplates?.map((template, index) => (
            <CFAppCard key={index} template={template} />
          ));
        })()}
      </div>
    </div>
  );
}
