"use client";

import { ReactElement } from "react";
import Card from "../card/card.comp";
import AppStatusCard from "../app.status.card/app.status.card";

export default function Overview(): ReactElement {
  return (
    <div className="hw-full flex flex-col gap-12">
      <div className="hw-full grid grid-cols-2 gap-12">
        <div className="col-span-1">
          <Card>
            <></>
          </Card>
        </div>
        <div className="col-span-1">
          <AppStatusCard />
        </div>
      </div>
      <div className="hw-full grid grid-cols-2 gap-12">
        <div className="col-span-1">
          <Card>
            <></>
          </Card>
        </div>
        <div className="col-span-1">
          <Card>
            <></>
          </Card>
        </div>
      </div>
    </div>
  );
}
