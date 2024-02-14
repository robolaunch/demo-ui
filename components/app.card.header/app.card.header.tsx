import AppStatus from "@/components/app.status/app.status.comp";
import { ReactElement } from "react";

interface IAppCardHeader {
  title: string;
  description: string;
  status: boolean;
}

export default function AppCardHeader({
  title,
  description,
  status,
}: IAppCardHeader): ReactElement {
  return (
    <div className="flex w-full justify-center">
      <div className="flex w-full flex-col">
        <h1 className="text-base font-semibold">{title}</h1>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <div className="col-span-1 flex">
        <AppStatus isReady={status} />
      </div>
    </div>
  );
}
