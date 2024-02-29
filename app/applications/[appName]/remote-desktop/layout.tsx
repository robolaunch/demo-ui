import { Fragment, ReactElement } from "react";

interface IRemoteDesktopLayout {
  children: ReactElement | ReactElement[];
}

export default function RemoteDesktopLayout({
  children,
}: IRemoteDesktopLayout): ReactElement {
  return (
    <Fragment>
      <Fragment>{children}</Fragment>
    </Fragment>
  );
}
