"use client";

import Categories from "@/components/create.categories/create.categories";
import Templates from "@/components/create.templates/create.templates";
import { ReactElement, useState } from "react";

export default function CreateApp(): ReactElement {
  const [categoryFilter, setCategoryFilter] = useState<string>("plain");

  return (
    <div className="hw-full flex flex-col gap-6">
      <Categories
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
      />

      <Templates categoryFilter={categoryFilter} />
    </div>
  );
}
