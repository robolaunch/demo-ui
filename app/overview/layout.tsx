import PageLayout from "@/layouts/page.layout";
import { ReactElement } from "react";

interface IOverviewLayout {
  children: ReactElement | ReactElement[];
}

export default function OverviewLayout({ children }: IOverviewLayout) {
  return (
    <PageLayout title="Overview" paragraph="This is the overview page layout">
      {children}
    </PageLayout>
  );
}
