import { ReactElement } from "react";
import {
  IoAddCircleOutline,
  IoAppsOutline,
  IoGridOutline,
  IoHelpBuoyOutline,
} from "react-icons/io5";
import SidebarItem from "../sidebar.item/sidebar.item.comp";
import useMain from "@/hooks/useMain";
import { useRouter } from "next/navigation";

export default function SidebarMain(): ReactElement {
  const { sidebarState } = useMain();

  const router = useRouter();

  return (
    <div className="flex flex-col gap-2">
      {[
        {
          label: "Overview",
          icon: <IoGridOutline size={22} />,
        },
        {
          label: "Create",
          icon: <IoAddCircleOutline size={22} />,
        },
        {
          label: "Applications",
          icon: <IoAppsOutline size={22} />,
        },
        {
          label: "Help",
          icon: <IoHelpBuoyOutline size={22} />,
        },
      ].map((item, index) => {
        return (
          <SidebarItem
            active={sidebarState.activePage === item.label.toLowerCase()}
            key={index}
            icon={item.icon}
            label={item.label}
            onClick={() => {
              router.push(`/${item.label.toLowerCase()}`);
            }}
          />
        );
      })}
    </div>
  );
}