import { ReactElement } from "react";

interface IAppStatus {
  status: string;
  iconSize?: 1 | 2 | 3 | 4 | 5;
  textWeight?: "text-sm" | "text-xs";
}

export default function AppStatus({
  status,
  textWeight = "text-sm",
  iconSize = 3,
}: IAppStatus): ReactElement {
  return (
    <div className="flex items-center gap-1">
      <div
        style={{ width: `${iconSize * 4}px`, height: `${iconSize * 4}px` }}
        className={`rounded-full ${(() => {
          switch (status) {
            case "EnvironmentReady":
              return "bg-green-500";
            case "Unreachable Status":
              return "bg-red-500";
            default:
              return "bg-yellow-500";
          }
        })()}
          `}
      />
      <p className={`text-xs ${textWeight}`}>
        {(() => {
          switch (status) {
            case "EnvironmentReady":
              return "Ready";
            case "ConfiguringEnvironment":
              return "Configuring";
            default:
              return status;
          }
        })()}
      </p>
    </div>
  );
}
