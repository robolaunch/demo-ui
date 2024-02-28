"use client";

import { ReactElement } from "react";
import {
  IoChevronBackOutline,
  IoGridOutline,
  IoLogoPython,
  IoTerminalOutline,
  IoTvOutline,
} from "react-icons/io5";
import SidebarItem from "../sidebar.item/sidebar.item.comp";
import useMain from "@/hooks/useMain";
import { useRouter } from "next/navigation";
import useApp from "@/hooks/useApp";

export default function SidebarApp(): ReactElement {
  const { setSidebarState, setAppState, appState } = useMain();

  const router = useRouter();

  const { appData } = useApp();

  return (
    <div className="flex flex-col gap-6">
      {[
        {
          label: "Back",
          icon: <IoChevronBackOutline size={22} />,
          onClick: () => {
            setAppState((prev) => {
              return {
                ...prev,
                activeTab: "overview",
              };
            });
            router.push("/applications");
            setSidebarState((prev) => {
              return {
                ...prev,
                activePage: "applications",
              };
            });
          },
        },
        {
          label: "Overview",
          icon: <IoGridOutline size={22} />,
          onClick: () => {
            setAppState((prev) => {
              return {
                ...prev,
                activeTab: "overview",
              };
            });
          },
        },
        {
          label: "Code Editor",
          icon: <IoTerminalOutline size={22} />,
          onClick: () => {
            setAppState((prev) => {
              return {
                ...prev,
                activeTab: "code editor",
              };
            });
          },
        },
        {
          label: "Remote Desktop",
          icon: <IoTvOutline size={22} />,
          onClick: () => {
            setAppState((prev) => {
              return {
                ...prev,
                activeTab: "remote desktop",
              };
            });
          },
        },
        {
          label: "Jupyter Notebook",
          icon: <IoLogoPython size={22} />,
          onClick: () => {
            window.open(
              appData?.services?.jupyterNotebook?.httpsEndpoint,
              "_blank",
            );
          },
        },
      ]?.map((item, index) => {
        if (
          item.label === "Jupyter Notebook" &&
          !appData?.services?.jupyterNotebook?.isEnabled
        ) {
          return null;
        }

        const isAppReady: boolean =
          appData?.clusters?.environment?.[0]?.status === "EnvironmentReady"
            ? true
            : false;

        return (
          <SidebarItem
            disabled={!isAppReady}
            active={appState.activeTab === item.label.toLowerCase()}
            key={index}
            icon={item.icon}
            label={item.label}
            onClick={item.onClick}
          />
        );
      })}
    </div>
  );
}
