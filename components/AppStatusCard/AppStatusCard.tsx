import { ReactElement } from "react";
import Card from "../Card/Card";
import { ProgressSpinner } from "primereact/progressspinner";
import useApp from "@/hooks/useApp";
import Status from "../AppStatus/AppStatus";

export default function AppStatusCard(): ReactElement {
  const { appData } = useApp();

  const status: string = appData?.clusters?.environment?.[0]?.status;

  return (
    <Card className="flex flex-col items-center justify-center gap-4">
      <ProgressSpinner
        style={{ width: "50px", height: "50px" }}
        strokeWidth="4"
        fill="var(--surface-ground)"
        animationDuration=".5s"
      />
      <span>{status}</span>
      <Status status="" />
    </Card>
  );
}
