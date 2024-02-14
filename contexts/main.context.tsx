"use client";

import { ISidebarState } from "@/interfaces/sidebarstate.interface";
import React, { ReactElement, createContext, useState } from "react";
import constantSidebarState from "@/constants/sidebarstate.constant.json";
import { ISelectedState } from "@/interfaces/main.hook.interface";
import selectedStateContant from "@/constants/selectedState.constant.json";
export const MainContext: any = createContext<any>(null);

interface IMainContext {
  children: ReactElement | ReactElement[];
}

// eslint-disable-next-line
export default ({ children }: IMainContext) => {
  const [sidebarState, setSidebarState] = useState<ISidebarState>(
    constantSidebarState as ISidebarState,
  );

  const [selectedState, setSelectedState] = useState<ISelectedState>(
    selectedStateContant as ISelectedState,
  );

  const [applications, setApplications] = useState<any[]>([
    1, 2, 3, 4, 5, 6, 7, 8, 9,
  ]);

  return (
    <MainContext.Provider
      value={{
        sidebarState,
        setSidebarState,
        applications,
        setApplications,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
