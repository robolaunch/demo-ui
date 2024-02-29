import IDE from "@/components/app.ide/app.ide.comp";
import { Fragment, ReactElement } from "react";

interface ICodeEditorLayout {
  children: ReactElement | ReactElement[];
}

export default function CodeEditorLayout({
  children,
}: ICodeEditorLayout): ReactElement {
  return <Fragment>{children}</Fragment>;
}
