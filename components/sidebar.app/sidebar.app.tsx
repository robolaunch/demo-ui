"use client";

import { ReactElement } from "react";
import {
  IoChevronBackOutline,
  IoGridOutline,
  IoTerminalOutline,
  IoTvOutline,
} from "react-icons/io5";
import SidebarItem from "../sidebar.item/sidebar.item.comp";
import useMain from "@/hooks/useMain";
import { useRouter } from "next/navigation";

export default function SidebarApp(): ReactElement {
  const { sidebarState, setSidebarState, setAppState, appState } = useMain();

  const router = useRouter();

  return (
    <div className="flex flex-col gap-2">
      {[
        {
          label: "Back",
          icon: <IoChevronBackOutline size={22} />,
          onClick: () => {
            router.push("/overview");
            setSidebarState({ activePage: "overview" });
          },
        },
        {
          label: "Overview",
          icon: <IoGridOutline size={22} />,
          onClick: () => {
            setAppState({ activeTab: "overview" });
          },
        },
        {
          label: "IDE",
          icon: <IoTerminalOutline size={22} />,
          onClick: () => {
            setAppState({ activeTab: "ide" });
          },
        },
        {
          label: "VDI",
          icon: <IoTvOutline size={22} />,
          onClick: () => {
            setAppState({ activeTab: "vdi" });
          },
        },
      ].map((item, index) => {
        return (
          <SidebarItem
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
