import Status from "@/components/status/status.comp";
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
    <div className="flex w-full justify-between">
      <div className="flex w-full flex-col items-start">
        <h1 className="text-base font-semibold">{title}</h1>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <div className="col-span-1 flex">
        <Status isReady={status} />
      </div>
    </div>
  );
}
