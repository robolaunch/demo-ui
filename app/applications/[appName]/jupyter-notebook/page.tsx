"use client";

import JupyterNotebook from "@/components/JupyterNotebook/JupyterNotebook";
import { Fragment, ReactElement } from "react";

export default function CodeEditor(): ReactElement {
  return (
    <Fragment>
      <JupyterNotebook />
    </Fragment>
  );
}
