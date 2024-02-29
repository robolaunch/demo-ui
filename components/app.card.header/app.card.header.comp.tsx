import { ReactElement } from "react";

interface IAppCardHeader {
  title: string;
  status: boolean;
}

export default function AppCardHeader({
  title,
  status,
}: IAppCardHeader): ReactElement {
  return (
    <div className="flex w-full justify-between">
      <h1 className="text-base font-semibold text-slate-700">{title}</h1>
      {/* <Status isReady={status} /> */}
    </div>
  );
}
