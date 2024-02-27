"use client";

import { ISidebarState } from "@/interfaces/sidebarstate.interface";
import React, { ReactElement, createContext, useEffect, useState } from "react";
import constantSidebarState from "@/constants/sidebarstate.constant.json";
import { ISelectedState } from "@/interfaces/main.hook.interface";
import { IAppState } from "@/interfaces/app.config.interface";
import appStateConstant from "@/constants/appState.constant.json";
import { ITemplate } from "@/interfaces/template.interface";
import { getTemplates } from "@/apis/template.api";
import LayoutLoading from "@/components/layout.loading/layout.loading.comp";
import CreateNamespaceModal from "@/components/modal.createns.comp/modal.createns.comp";
import CreateOrganizationModal from "@/components/modal.createorg.comp/modal.createorg.comp";
import {
  selectedStateDataSetter,
  selectedStateInitialGetter,
  selectedStateInitialSetter,
} from "@/functions/selectedState.functions";

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
  const [appState, setAppState] = useState<IAppState>(
    appStateConstant as IAppState,
  );
  const [templates, setTemplates] = useState<ITemplate[]>([]);
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

  return (
    <MainContext.Provider
      value={{
        sidebarState,
        setSidebarState,
        selectedState,
        setSelectedState,
        templates,
        setTemplates,
        appState,
        setAppState,
      }}
    >
      {!selectedState.namespace && <CreateNamespaceModal onClose={() => {}} />}
      {!selectedState.organization && (
        <CreateOrganizationModal onClose={() => {}} />
      )}
      {loading && <LayoutLoading />}
      {children}
    </MainContext.Provider>
  );
};
