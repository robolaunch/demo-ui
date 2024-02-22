"use client";

import Categories from "@/components/create.categories/create.categories";
import Templates from "@/components/create.templates/create.templates";
import { ReactElement } from "react";

export default function CreateApp(): ReactElement {
  return (
    <div className="hw-full flex flex-col gap-6">
      <Categories />

      <Templates />
    </div>
  );
}
