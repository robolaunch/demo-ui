"use client";

import { getEnvironmentsAPI } from "@/apis/environment.api";
import AppCard from "@/components/app.card/app.card";
import AppsLoading from "@/components/apps.loading.comp/apps.loading.comp";
import useMain from "@/hooks/useMain";
import { IEnvironment } from "@/interfaces/environment.interface";
import { ReactElement, useEffect, useState } from "react";

export default function Apps(): ReactElement {
  const [apps, setApps] = useState<IEnvironment[] | undefined>(undefined);

  const { selectedState } = useMain();

  useEffect(() => {
    selectedState?.namespace?.name && getApps();
    // eslint-disable-next-line react-hooks/exhaustive-deps

    const timer = setInterval(() => {
      selectedState?.namespace?.name && getApps();
    }, 10000);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedState]);

  async function getApps() {
    setApps(
      await getEnvironmentsAPI({
        orgId: selectedState?.organization?.id!,
        regionName: selectedState?.region?.name!,
        providerRegion: selectedState?.region?.region!,
        instanceId: selectedState?.instance?.id!,
        namespaceName: selectedState?.namespace?.name!,
      }),
    );
  }

  return (
    <div className="hw-full grid grid-cols-3 grid-rows-3">
      {apps?.map((app, index) => {
        return (
          <div key={index} className="col-span-1 row-span-1 p-4">
            <AppCard app={app} />
          </div>
        );
      }) || <AppsLoading />}
    </div>
  );
}
