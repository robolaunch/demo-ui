import PageLayout from "@/layouts/page.layout";
import { ReactElement } from "react";

interface IHelpLayout {
  children: ReactElement | ReactElement[];
}

export default function HelpLayout({ children }: IHelpLayout): ReactElement {
  return (
    <PageLayout
      title="Help"
      paragraph="This is the help page layout"
      state="help"
    >
      {children}
    </PageLayout>
  );
}
