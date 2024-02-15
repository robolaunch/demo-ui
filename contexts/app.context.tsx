"use client";

import useMain from "@/hooks/useMain";
import { useParams } from "next/navigation";
import { getEnvironmentAPI } from "@/apis/environment.api";
import { IEnvironment } from "@/interfaces/environment.interface";
import { ReactElement, createContext, useEffect, useState } from "react";

export const AppContext: any = createContext<any>(null);

interface IAppContext {
  children: ReactElement | ReactElement[];
}

// eslint-disable-next-line
export default ({ children }: IAppContext) => {
  const [appData, setAppData] = useState<IEnvironment>();

  const { selectedState } = useMain();

  const {
    appName,
  }: {
    appName: string;
  } = useParams();

  useEffect(() => {
    selectedState?.namespace?.name && handleGetApp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedState]);

  async function handleGetApp() {
    setAppData(
      await getEnvironmentAPI({
        orgId: selectedState?.organization?.id!,
        regionName: selectedState?.region?.name!,
        providerRegion: selectedState?.region?.region!,
        instanceId: selectedState?.instance?.id!,
        namespaceName: selectedState?.namespace?.name!,
        appName: appName,
      }),
    );
  }

  return (
    <AppContext.Provider
      value={{
        appData,
        setAppData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
