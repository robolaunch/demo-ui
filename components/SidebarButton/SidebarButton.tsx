import useMain from "@/hooks/useMain";
import { ReactElement } from "react";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

export default function SidebarButton(): ReactElement {
  const { setSidebarState, sidebarState } = useMain();

  return (
    <div
      className="animate__animated animate__fadeIn animate__delay-1s absolute left-0 top-12 z-10 cursor-pointer rounded-r border-y border-r border-slate-200 bg-white px-1 py-1.5"
      onClick={() => {
        setSidebarState((prev) => {
          return {
            ...prev,
            isOpen: !prev.isOpen,
          };
        });
      }}
    >
      {sidebarState.isOpen ? (
        <IoChevronBackOutline size={18} />
      ) : (
        <IoChevronForwardOutline size={18} />
      )}
    </div>
  );
}
