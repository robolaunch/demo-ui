import { ReactElement } from "react";

interface IAppStatus {
  isReady: boolean;
}

export default function AppStatus({ isReady }: IAppStatus): ReactElement {
  return (
    <div className="flex items-center gap-2">
      <div
        className={`h-3 w-3 rounded-full ${isReady ? "bg-green-500" : "bg-yellow-500"}`}
      />
      <p className="text-sm">{isReady ? "Ready" : "Not Ready"}</p>
    </div>
  );
}
