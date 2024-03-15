"use client";

import PageLayout from "@/layouts/page.layout";
import { ReactElement } from "react";

interface ICreateApp {
  children: ReactElement | ReactElement[];
}

export default function CreateApp({ children }: ICreateApp): ReactElement {
  return (
    <PageLayout
      title="Create Application"
      paragraph="To create an application, please fill out the form below."
      state="create"
    >
      {children}
    </PageLayout>
  );
}
