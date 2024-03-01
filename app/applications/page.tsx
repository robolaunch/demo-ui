"use client";

import { useRouter } from "next/navigation";
import { Fragment, ReactElement } from "react";

export default function Apps(): ReactElement {
  const router = useRouter();

  router.push("/create");

  return <Fragment />;
}
