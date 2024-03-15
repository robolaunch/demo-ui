"use client";

import PageLayout from "@/layouts/page.layout";
import { ReactElement } from "react";

interface IHelpLayout {
  children: ReactElement | ReactElement[];
}

export default function HelpLayout({ children }: IHelpLayout): ReactElement {
  return (
    <PageLayout
      title="Help"
      paragraph="If you need help, please fill out the form below. We will get back to you as soon as possible."
      state="help"
    >
      {children}
    </PageLayout>
  );
}
