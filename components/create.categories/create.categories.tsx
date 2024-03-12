"use client";

import { ReactElement, useEffect, useState } from "react";
import { ToggleButton } from "primereact/togglebutton";
import { ICategory } from "@/interfaces/template.interface";
import { categoriesMapper } from "@/handlers/template.handler";
import useMain from "@/hooks/useMain";
import { ICreateEnvironmentForm } from "@/interfaces/create.interface";
import { FormikProps } from "formik";
import { IEnvironment } from "@/interfaces/environment.interface";

interface ICategories {
  formik: FormikProps<IEnvironment>;
}

export default function Categories({ formik }: ICategories): ReactElement {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const { templates } = useMain();

  useEffect(() => {
    handleGetCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [templates]);

  async function handleGetCategories() {
    setCategories(categoriesMapper(templates));
  }

  return (
    <div className="grid grid-cols-7">
      {categories?.map((category) => {
        const checked: boolean =
          formik.values.applicationConfig.domainName ===
          category.category.toLowerCase();

        return (
          <div
            onClick={() => {
              formik.setValues({
                ...formik.values,
                applicationConfig: {
                  ...formik.values.applicationConfig,
                  domainName: category.category.toLowerCase(),
                  application: {
                    name: "",
                    version: "",
                  },
                  devspace: {
                    desktop: "",
                    ubuntuDistro: "",
                    version: "",
                  },
                },
              });
            }}
            className="col-span-1"
            key={category.category}
          >
            <ToggleButton
              offLabel={category.alias}
              onLabel={category.alias}
              className={`w-32 text-xs ${checked && "border-primary-700 bg-primary-500"}`}
              checked={checked}
            />
          </div>
        );
      })}
    </div>
  );
}
