import { ReactElement } from "react";
import Card from "../card/card.comp";
import useApp from "@/hooks/useApp";
import useMain from "@/hooks/useMain";
import Image from "next/image";

interface IAppServiceCard {
  type: "ide" | "vdi" | "jupyterNotebook";
}

export default function AppServiceCard({
  type,
}: IAppServiceCard): ReactElement {
  const { appData } = useApp();
  const { setAppState } = useMain();

  const content = {
    ide: {
      title: "Code Editor",
      description: "Integrated Development Environment",
    },
    vdi: {
      title: "Remote Desktop",
      description: "Virtual Desktop Infrastructure",
    },
    jupyterNotebook: {
      title: "Jupyter Notebook",
      description: "Data Science and Machine Learning",
    },
  };

  return (
    <Card
      className="transition-300 flex cursor-pointer flex-col items-center justify-between gap-4 p-10 hover:scale-105 hover:shadow-lg"
      onClick={() => {
        if (type === "jupyterNotebook") {
          window.open(
            appData?.services?.jupyterNotebook?.httpsEndpoint,
            "_blank",
          );
        } else {
          setAppState((prev) => {
            return {
              ...prev,
              activeTab: type === "ide" ? "code editor" : "remote desktop",
            };
          });
        }
      }}
    >
      <Image
        width={64 * 7}
        height={64 * 7}
        src={`/services/${type}.png` || "/icons/rocket.svg"}
        alt={type}
      />
      <p className="text-base font-medium">{content?.[`${type}`]?.title}</p>
      <p className="text-center text-sm text-slate-500">
        {content?.[`${type}`]?.description}
      </p>
    </Card>
  );
}
