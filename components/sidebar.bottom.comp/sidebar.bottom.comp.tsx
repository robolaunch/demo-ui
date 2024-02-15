import { ReactElement } from "react";
import { IoLogOutOutline } from "react-icons/io5";
import SidebarItem from "../sidebar.item/sidebar.item.comp";

export default function SidebarBottom(): ReactElement {
  return (
    <div className="flex flex-col">
      {[
        {
          label: "Logout",
          icon: <IoLogOutOutline size={22} />,
        },
      ].map((item, index) => {
        return <SidebarItem key={index} icon={item.icon} label={item.label} />;
      })}
    </div>
  );
}
