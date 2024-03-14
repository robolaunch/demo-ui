"use client";

import { INamespace, INamespaceBE } from "@/interfaces/namespace.interface";
import { kubernetesApi } from "./openapi";
import { namespacesMapper } from "@/handlers/namespace.handler";
export function createNamespaceAPI(values: {
  orgId: string;
  regionName: string;
  providerRegion: string;
  instanceId: string;
  namespaceName: string;
}): Promise<void> {
  return new Promise<void>(async (resolve, reject) => {
    try {
      await kubernetesApi.createNamespace({
        name: "fleet/createNamespace",
        organizationId: values?.orgId,
        roboticsClouds: [
          {
            name: values?.regionName,
            cloudInstances: [
              {
                instanceId: values?.instanceId,
                region: values?.providerRegion,
                robolaunchNamespaces: [{ name: values?.namespaceName }],
              },
            ],
          },
        ],
      });
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

export function getNamespacesAPI(values: {
  orgId: string;
  regionName: string;
  providerRegion: string;
  instanceId: string;
}): Promise<INamespace[]> {
  return new Promise<INamespace[]>(async (resolve, reject) => {
    try {
      const response: any = await kubernetesApi.getNamespaces({
        name: "namespace/getNamespaces",
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

      const namespaces: INamespace[] = namespacesMapper(
        response?.data?.data?.[0]?.roboticsClouds?.[0]?.cloudInstances?.[0]
          ?.robolaunchNamespaces as INamespaceBE[],
      );

      resolve(namespaces);
    } catch (error) {
      reject(error);
    }
  });
}
