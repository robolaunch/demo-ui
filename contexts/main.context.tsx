"use client";

import React, { ReactElement, createContext, useEffect, useState } from "react";
import LayoutLoading from "@/components/layout.loading/layout.loading.comp";
import constantSidebarState from "@/constants/sidebarstate.constant.json";
import { ISidebarState } from "@/interfaces/sidebarstate.interface";
import { ISelectedState } from "@/interfaces/main.hook.interface";
import { IEnvironment } from "@/interfaces/environment.interface";
import { getEnvironmentsAPI } from "@/apis/environment.api";
import { ITemplate } from "@/interfaces/template.interface";
import { getTemplates } from "@/apis/template.api";
import {
  selectedStateDataSetter,
  selectedStateInitialGetter,
  selectedStateInitialSetter,
} from "@/functions/selectedState.function";
import ModalCreateNS from "@/components/ModalCreateNS/ModalCreateNS";
import ModalCreateOrg from "@/components/ModalCreateOrg/ModalCreateOrg";

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
    selectedStateInitialGetter() as ISelectedState,
  );
  const [templates, setTemplates] = useState<ITemplate[]>([]);
  const [applications, setApplications] = useState<IEnvironment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    handleGetTemplates();
    !selectedState.namespace && selectedStateDataSetterFC();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(selectedState);
    selectedStateInitialSetter(selectedState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedState]);

  async function handleGetTemplates() {
    setTemplates(await getTemplates());
  }

  async function selectedStateDataSetterFC(): Promise<void> {
    setLoading(true);

    const { orgs, regions, instances, namespaces } =
      await selectedStateDataSetter(selectedState);

    setSelectedState((prev) => {
      return {
        ...prev,
        organization: orgs?.[0] || null,
        region: regions?.[0] || null,
        instance: instances?.[0] || null,
        namespace: namespaces?.[0] || null,
      };
    });
    setLoading(false);
  }

  async function handleGetApplications() {
    setApplications(
      await getEnvironmentsAPI({
        orgId: selectedState?.organization?.id!,
        regionName: selectedState?.region?.name!,
        providerRegion: selectedState?.region?.region!,
        instanceId: selectedState?.instance?.id!,
        namespaceName: selectedState?.namespace?.name!,
      }),
    );
  }

  useEffect(() => {
    const timer = setInterval(() => {
      selectedState?.namespace?.name && handleGetApplications();
    }, 5000);

    return () => clearInterval(timer);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applications, selectedState]);

  return (
    <MainContext.Provider
      value={{
        sidebarState,
        setSidebarState,
        selectedState,
        setSelectedState,
        templates,
        setTemplates,
        applications,
        setApplications,
      }}
    >
      {!selectedState.namespace && <ModalCreateNS />}
      {!selectedState.organization && <ModalCreateOrg />}
      {loading ? <LayoutLoading /> : children}
    </MainContext.Provider>
  );
};
