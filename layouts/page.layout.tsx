"use client";

import useMain from "@/hooks/useMain";
import { Fragment, ReactElement, useEffect } from "react";

interface IPageLayout {
  children: ReactElement | ReactElement[];
  title: string;
  paragraph: string;
  state: "overview" | "create" | "applications" | "help";
}

export default function PageLayout({
  children,
  title,
  paragraph,
  state,
}: IPageLayout): ReactElement {
  const { setSidebarState, setAppState, appState } = useMain();

  useEffect(() => {
    setSidebarState((prev) => {
      return {
        ...prev,
        activePage: state,
      };
    });

    setAppState((prev) => {
      return {
        ...prev,
        activeTab: "overview",
      };
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (appState.activeTab !== "overview") {
    return <Fragment>{children}</Fragment>;
  }

  return (
    <div className="hw-full animate__animated animate__fadeIn grid grid-rows-12 px-24 py-10">
      <div className="hw-full row-span-1 flex flex-col justify-between">
        <h1 className="text-2xl font-medium text-slate-600">{title}</h1>
        <p className="text-sm text-slate-400">{paragraph}</p>
        <span className="w-hull h-[1px] bg-slate-300" />
      </div>
      <div className="hw-full row-span-11 py-8">{children}</div>
    </div>
  );
}
