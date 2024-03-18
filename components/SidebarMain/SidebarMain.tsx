import { IoAddCircleOutline, IoHelpBuoyOutline } from "react-icons/io5";
import SidebarApplicationsItem from "../SidebarApplicationsItem/SidebarApplicationsItem";
import SidebarItem from "../SidebarItem/SidebarItem";
import { useRouter } from "next/navigation";
import useMain from "@/hooks/useMain";
import { ReactElement } from "react";

export default function SidebarMain(): ReactElement {
  const { sidebarState } = useMain();

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
