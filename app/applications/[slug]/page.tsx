import { ReactElement } from "react";

interface IAppPage {
  children: ReactElement | ReactElement[];
  params: {
    slug: string;
  };
}

export default function AppPage({ children, params }: IAppPage): ReactElement {
  return (
    <>
      <>{params.slug}</>
    </>
  );
}
