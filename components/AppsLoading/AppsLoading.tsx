"use client";

import { Fragment, ReactElement } from "react";
import Skeleton from "react-loading-skeleton";

export default function AppsLoading(): ReactElement {
  return (
    <Fragment>
      {Array(9)
        .fill(undefined)
        .map((_, index) => {
          return (
            <Skeleton
              key={index}
              width={"100%"}
              height={"100%"}
              containerClassName="col-span-1 row-span-1 p-4"
            />
          );
        })}
    </Fragment>
  );
}
