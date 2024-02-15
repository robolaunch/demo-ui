import packageJSON from "@/package.json";
import { ReactElement } from "react";

export default function Version(): ReactElement {
  return (
    <div className="fixed bottom-0 right-1 z-50">
      <p className="flex gap-1 text-xs text-slate-500">
        v{packageJSON?.version}
      </p>
    </div>
  );
}
