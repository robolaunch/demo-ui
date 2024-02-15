"use client";

import PageLayout from "@/layouts/page.layout";
import { useParams } from "next/navigation";
import { ReactElement } from "react";

interface IAppsLayout {
  children: ReactElement | ReactElement[];
}

export default function AppsLayout({ children }: IAppsLayout): ReactElement {
  const params = useParams();

  const meta = {
    title: params?.appName ? `${params?.appName} App` : "Apps",
    paragraph: params?.appName
      ? "This is the app layout"
      : "This is the apps page layout",
  };

  return (
    <PageLayout
      title={meta.title}
      paragraph={meta.paragraph}
      state="applications"
    >
      {children}
    </PageLayout>
  );
}
