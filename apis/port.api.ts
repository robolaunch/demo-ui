"use client";

import { kubernetesApi } from "./openapi";

export async function getPort(values: {
  orgId: string;
  regionName: string;
  instanceId: string;
  providerRegion: string;
}) {
  return new Promise(async (resolve, reject) => {
    try {
      const response: any = await kubernetesApi.getFreeNodePort({
        name: "port/getFreeNodePort",
        organizationId: values?.orgId,
        roboticsClouds: [
          {
            name: values?.regionName,
            cloudInstances: [
              {
                instanceId: values?.instanceId,
                region: values?.providerRegion,
              },
            ],
          },
        ],
      });

      const port: number = response.data as number;

      resolve(port);
    } catch (error) {
      reject(error);
    }
  });
}
