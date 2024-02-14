"use client";

import { ReactElement } from "react";
import Card from "../card/card.comp";
import AppCardHeader from "../app.card.header/app.card.header";
import AppCardBody from "../app.card.body/app.card.body";
import Link from "next/link";

export default function AppCard(): ReactElement {
  return (
    <Card>
      <Link
        href={"/applications/test-app"}
        className="hw-full transition-500 gap- flex flex-col bg-white p-6 hover:scale-105"
      >
        <AppCardHeader
          title="App Name"
          description="App Description"
          status={true}
        />
        <AppCardBody />
      </Link>
    </Card>
  );
}
