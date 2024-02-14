import PageLayout from "@/layouts/page.layout";
import { ReactElement } from "react";

interface ICreateApp {
  children: ReactElement | ReactElement[];
}

export default function CreateApp({ children }: ICreateApp): ReactElement {
  return (
    <PageLayout
      title="Create App"
      paragraph="This is the create app page layout"
    >
      {children}
    </PageLayout>
  );
}
