"use client";

import AppCard from "@/components/app.card/app.card";
import { ReactElement } from "react";

export default function Apps(): ReactElement {
  return (
    <div className="hw-full grid grid-cols-3 grid-rows-2">
      {[1, 2, 3, 4, 5, 6]?.map((_, index) => {
        return (
          <div key={index} className="col-span-1 row-span-1 p-4">
            <AppCard />
          </div>
        );
      })}
    </div>
  );
}
