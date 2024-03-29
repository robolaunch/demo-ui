"use client";

import { Fragment, ReactElement, useEffect, useState } from "react";
import Card from "../Card/Card";
import InputRadio from "../InputRadio/InputRadio";
import { ICategory } from "@/interfaces/template.interface";
import { categoriesMapper } from "@/handlers/template.handler";
import useMain from "@/hooks/useMain";
import useCreate from "@/hooks/useCreate";
import CFFilterItem from "../CFFilterItem/CFFilterItem";

export default function CFFilter(): ReactElement {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const { templates } = useMain();
  const { formik, filters, setFilters } = useCreate();

  useEffect(() => {
    handleGetCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [templates]);

  async function handleGetCategories() {
    setCategories(categoriesMapper(templates));
  }

  return (
    <Card className="flex !h-fit !w-80 flex-col gap-8 p-6">
      <CFFilterItem label="Categories">
        <Fragment>
          {categories?.map((category, index) => {
            const checked: boolean =
              formik.values.applicationConfig.domainName ===
              category.category.toLowerCase();

            return (
              <InputRadio
                key={index}
                label={category.alias}
                checked={checked}
                onChange={() => {
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
              />
            );
          })}
        </Fragment>
      </CFFilterItem>
      <CFFilterItem label="Publisher">
        {[
          { label: "All", value: "all" },
          {
            label: "robolaunch Verified",
            value: "verified",
          },
          {
            label: "All Users",
            value: "public",
          },
          {
            label: "My Organization",
            value: "organization",
          },
          {
            label: "Me",
            value: "private",
          },
        ]?.map((item, index) => {
          return (
            <InputRadio
              key={index}
              label={item.label}
              checked={filters.publisher === item.value}
              onChange={() => {
                setFilters((prev) => ({
                  ...prev,
                  publisher: item.value,
                }));
              }}
            />
          );
        })}
      </CFFilterItem>
    </Card>
  );
}
