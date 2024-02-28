import { ReactElement } from "react";
import { IoLogOutOutline } from "react-icons/io5";
import SidebarItem from "../sidebar.item/sidebar.item.comp";
import { useKeycloak } from "@react-keycloak/web";

export default function SidebarBottom(): ReactElement {
  const { keycloak } = useKeycloak();

  return (
    <div className="flex flex-col">
      {[
        {
          label: "Logout",
          icon: <IoLogOutOutline size={22} />,
          onClick: () => {
            localStorage.clear();
            keycloak?.logout();
          },
        },
      ].map((item, index) => {
        return (
          <SidebarItem
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
