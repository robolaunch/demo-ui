"use client";

import PageLayout from "@/layouts/page.layout";
import { useParams } from "next/navigation";
import { ReactElement } from "react";

interface IAppsLayout {
  children: ReactElement | ReactElement[];
}

export default function AppsLayout({ children }: IAppsLayout): ReactElement {
  const url = useParams();

  const meta = {
    title: url?.slug ? `${url?.slug} App` : "Apps",
    paragraph: url?.slug
      ? "This is the app layout"
      : "This is the apps page layout",
  };

  return (
    <PageLayout title={meta.title} paragraph={meta.paragraph}>
      {children}
    </PageLayout>
  );
}
