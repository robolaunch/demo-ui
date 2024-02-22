"use client";

import {
  ICategory,
  ITemplate,
  ITemplateBE,
} from "@/interfaces/template.interface";

export function templatesMapper(data: ITemplateBE[]): ITemplate[] {
  return data?.map((item) => {
    return {
      category: item.domainName,
      image: {
        os: "Ubuntu",
        distro: item.devspace.ubuntuDistro,
        desktop: item.devspace.desktop,
        version: item.devspace.version,
      },
      app: {
        name: item.application.name,
        version: item.application.version,
        alias: item.application.alias,
        description: item.application.description,
        icon: item.application.icon,
      },
    };
  });
}

export function categoriesMapper(data: ITemplate[]): ICategory[] {
  const uniqueCategories: string[] = Array.from(
    new Set(data?.map((item) => item.category)),
  );

  return ["all", ...uniqueCategories]?.map((category) => {
    return {
      category: category,
      alias: (() => {
        switch (category) {
          case "all":
            return "All";
          case "plain":
            return "Plain";
          case "robotics":
            return "Robotics";
          case "aiml":
            return "AI/ML";
          case "data-science":
            return "Data Science";
          case "simulation":
            return "Simulation";
          case "cad":
            return "CAD";
          default:
            return category;
        }
      })(),
    };
  });
}
