import { ReactElement } from "react";
import {
  IoAddCircleOutline,
  IoAppsOutline,
  IoHelpBuoyOutline,
} from "react-icons/io5";
import SidebarItem from "../sidebar.item/sidebar.item.comp";
import useMain from "@/hooks/useMain";
import { useRouter } from "next/navigation";
import SidebarAppItem from "../SidebarAppItem/SidebarAppItem";
import SidebarApplicationsItem from "../SidebarApplicationsItem/SidebarApplicationsItem";

export default function SidebarMain(): ReactElement {
  const { sidebarState, applications } = useMain();

  const router = useRouter();

  return (
    <div className="flex flex-col gap-4">
      {[
        {
          label: "Create",
          icon: <IoAddCircleOutline size={22} />,
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

      <SidebarApplicationsItem />
    </div>
  );
}
