"use client";

import { ReactElement, useEffect, useState } from "react";
import { ToggleButton } from "primereact/togglebutton";
import { ICategory } from "@/interfaces/template.interface";
import { categoriesMapper } from "@/handlers/template.handler";
import useMain from "@/hooks/useMain";

export default function Categories(): ReactElement {
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
    <div className="grid grid-cols-10">
      {categories?.map((category) => {
        return (
          <div className="col-span-1" key={category.category}>
            <ToggleButton offLabel={category.alias} className="w-32 text-xs" />
          </div>
        );
      })}
    </div>
  );
}
