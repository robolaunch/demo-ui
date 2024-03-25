"use client";

import PageLayout from "@/layouts/PageLayout";
import { ReactElement } from "react";
import CreateProvider from "@/contexts/CreateContext";
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
