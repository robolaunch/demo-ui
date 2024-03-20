"use client";

import PageLayout from "@/layouts/page.layout";
import { ReactElement } from "react";
import CreateProvider from "@/contexts/create.context";
interface ICreateApp {
  children: ReactElement | ReactElement[];
}

export default function CreateApp({ children }: ICreateApp): ReactElement {
  return (
    <CreateProvider>
      <PageLayout
        title="Create Application"
        paragraph="To create an application, please fill out the form below."
        state="create"
      >
        {children}
      </PageLayout>
    </CreateProvider>
  );
}
