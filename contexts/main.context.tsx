"use client";

import { ISidebarState } from "@/interfaces/sidebarstate.interface";
import React, { ReactElement, createContext, useEffect, useState } from "react";
import constantSidebarState from "@/constants/sidebarstate.constant.json";
import { ISelectedState } from "@/interfaces/main.hook.interface";
import selectedStateContant from "@/constants/selectedState.constant.json";
import { getOrganizationsAPI } from "@/apis/organization.api";
import { getRegionsAPI } from "@/apis/region.api";
import { IRegion } from "@/interfaces/region.interface";
import { IOrganization } from "@/interfaces/organization.interface";
import { IInstance } from "@/interfaces/instance.interface";
import { getInstancesAPI } from "@/apis/instance.api";
import { INamespace } from "@/interfaces/namespace.interface";
import { getNamespacesAPI } from "@/apis/namespace.api";
import { IAppState } from "@/interfaces/app.config.interface";
import appStateConstant from "@/constants/appState.constant.json";

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

  const [appState, setAppState] = useState<IAppState>(
    appStateConstant as IAppState,
  );

  const [applications, setApplications] = useState<any[]>([
    1, 2, 3, 4, 5, 6, 7, 8, 9,
  ]);

  useEffect(() => {
    handleSelectedSetter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(selectedState);
  }, [selectedState]);

  async function handleSelectedSetter() {
    const orgs: IOrganization[] = await getOrganizationsAPI();

    const regions: IRegion[] =
      orgs?.length && !selectedState?.region
        ? await getRegionsAPI({ orgId: orgs?.[0]?.id })
        : [];

    const instances: IInstance[] =
      regions?.length && !selectedState?.instance
        ? await getInstancesAPI({
            orgId: orgs?.[0]?.id,
            regionName: regions?.[0]?.name,
            providerRegion: regions?.[0]?.region,
          })
        : [];

    const namespaces: INamespace[] =
      instances?.length && !selectedState?.namespace
        ? await getNamespacesAPI({
            orgId: orgs?.[0]?.id,
            regionName: regions?.[0]?.name,
            providerRegion: regions?.[0]?.region,
            instanceId: instances?.[0]?.id,
          })
        : [];

    if (regions?.length && instances?.length) {
      setSelectedState((prev) => {
        return {
          ...prev,
          organization: orgs?.[0] || null,
          region: regions?.[0] || null,
          instance: instances?.[0] || null,
          namespace: namespaces?.[0] || null,
        };
      });
    }
  }

  return (
    <MainContext.Provider
      value={{
        sidebarState,
        setSidebarState,
        selectedState,
        setSelectedState,
        applications,
        setApplications,
        appState,
        setAppState,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
