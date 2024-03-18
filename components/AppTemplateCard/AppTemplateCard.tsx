import { ReactElement, useEffect, useState } from "react";
import Card from "../Card/Card";
import useApp from "@/hooks/useApp";
import { templateFinder } from "@/functions/template.function";
import useMain from "@/hooks/useMain";
import { ITemplate } from "@/interfaces/template.interface";
import Image from "next/image";
import {
  templateDesktopViewer,
  templateDistroViewer,
} from "@/functions/environment.function";

export default function AppTemplateCard(): ReactElement {
  const [currentTemplate, setCurrentTemplate] = useState<ITemplate>();
  const { templates } = useMain();
  const { appData } = useApp();

  useEffect(() => {
    setCurrentTemplate(templateFinder(appData, templates));
  }, [appData, templates]);

  return (
    <Card className="flex flex-col items-center justify-between gap-4 p-10">
      <div className="hw-full flex items-start justify-between">
        <div className="flex w-full flex-col gap-2.5 text-sm">
          <p>
            <span className="font-medium">Application Model: </span>
            {currentTemplate?.app.alias}
          </p>
          <p>
            <span className="font-medium">Operating System: </span>

            {currentTemplate?.image.os}
          </p>
          <p>
            <span className="font-medium">OS Distribution: </span>

            {templateDistroViewer(currentTemplate?.image.distro!)}
          </p>
          <p>
            <span className="font-medium">Desktop Environment: </span>
            {templateDesktopViewer(currentTemplate?.image.desktop!)}
          </p>
          <p>
            <span className="font-medium">Application Version: </span>

            {currentTemplate?.app.version}
          </p>
          <p>
            <span className="font-medium">Image Version: </span>

            {currentTemplate?.image.version}
          </p>
        </div>
        <Image
          width={64 * 1.75}
          height={64 * 1.75}
          src={currentTemplate?.app?.icon! || "/icons/rocket.svg"}
          alt={currentTemplate?.app?.alias!}
          style={{
            objectFit: "contain",
          }}
        />
      </div>
      <p className="text-sm">
        <span className="font-medium">Application Description: </span>
        {currentTemplate?.app.description}
      </p>
    </Card>
  );
}
