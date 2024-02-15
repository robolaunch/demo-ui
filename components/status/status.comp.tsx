import { ReactElement } from "react";

interface IStatus {
  isReady: boolean;
  iconSize?: 1 | 2 | 3 | 4 | 5;
  textWeight?: "text-sm" | "text-xs";
}

export default function Status({
  isReady,
  textWeight = "text-sm",
  iconSize = 3,
}: IStatus): ReactElement {
  return (
    <div className="flex items-center gap-1">
      <div
        style={{ width: `${iconSize * 4}px`, height: `${iconSize * 4}px` }}
        className={`rounded-full ${isReady ? "bg-green-500" : "bg-yellow-500"}`}
      />
      <p className={textWeight}>{isReady ? "Ready" : "Preparing"}</p>
    </div>
  );
}
