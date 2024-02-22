"use client";

import { ReactElement, useEffect, useState } from "react";
import { ToggleButton } from "primereact/togglebutton";
import { ICategory } from "@/interfaces/template.interface";
import { categoriesMapper } from "@/handlers/template.handler";
import useMain from "@/hooks/useMain";

interface ICategories {
  categoryFilter: string;
  setCategoryFilter: (category: string) => void;
}

export default function Categories({
  categoryFilter,
  setCategoryFilter,
}: ICategories): ReactElement {
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
          <div
            onClick={() => setCategoryFilter(category.category)}
            className="col-span-1"
            key={category.category}
          >
            <ToggleButton
              offLabel={category.alias}
              onLabel={category.alias}
              className="w-32 text-xs"
              checked={categoryFilter === category.category.toLowerCase()}
            />
          </div>
        );
      })}
    </div>
  );
}
