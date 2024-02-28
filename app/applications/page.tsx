"use client";

import { getEnvironmentsAPI } from "@/apis/environment.api";
import AppCard from "@/components/app.card/app.card.comp";
import AppsLoading from "@/components/apps.loading/apps.loading.comp";
import Button from "@/components/button/button";
import useMain from "@/hooks/useMain";
import { IEnvironment } from "@/interfaces/environment.interface";
import { useRouter } from "next/navigation";
import { ReactElement, useEffect, useState } from "react";
import Image from "next/image";

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

  const router = useRouter();

  return (
    <div className="hw-full grid grid-cols-3 ">
      {typeof apps !== "undefined" &&
      !apps?.length &&
      selectedState?.namespace ? (
        <div className="hw-full col-span-3 flex flex-col items-center gap-8 p-16">
          <Image
            width={64 * 2}
            height={64 * 2}
            src="/icons/rocket.svg"
            alt="robolaunch"
          />
          <p className="text-2xl font-bold text-slate-600">
            Hello, welcome to robolaunch!
          </p>
          <p className="text-base text-slate-600">
            You do not have any applications yet. Create one by clicking the
            button below.
          </p>
          <Button
            label="Create First Application"
            type="button"
            onClick={() => router.push("/create")}
          />
        </div>
      ) : (
        apps?.map((app, index) => {
          return (
            <div key={index} className="col-span-1 p-4">
              <AppCard app={app} />
            </div>
          );
        }) || <AppsLoading />
      )}
    </div>
  );
}
