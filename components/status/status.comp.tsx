import { ReactElement } from "react";

interface IStatus {
  isReady: boolean;
}

export default function Status({ isReady }: IStatus): ReactElement {
  return (
    <div className="flex items-center gap-1">
      <div
        className={`h-3 w-3 rounded-full ${isReady ? "bg-green-500" : "bg-yellow-500"}`}
      />
      <p className="text-sm">{isReady ? "Ready" : "Preparing"}</p>
    </div>
  );
}
