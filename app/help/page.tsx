"use client";

import Card from "@/components/card/card.comp";
import { ReactElement } from "react";

export default function Help(): ReactElement {
  return (
    <Card className="p-2">
      <iframe
        className="hw-full"
        src="https://forms.zohopublic.eu/robolaunch/form/robolaunchPlatformForm/formperma/wdzEXselobn0zyK7bwEtjUQNAl0pR0FakvwmP1BS7mY"
      />
    </Card>
  );
}
