"use client";

import { IInstance, IInstanceBE } from "@/interfaces/instance.interface";
import { createInstanceApi } from "./openapi";
import { instancesMapper } from "@/handlers/instance.handler";

export async function getInstancesAPI(values: {
  orgId: string;
  regionName: string;
  providerRegion: string;
}): Promise<IInstance[]> {
  return new Promise<IInstance[]>(async (resolve, reject) => {
    try {
      const response: any =
        await createInstanceApi.getAllInstancesOfRoboticsCloud({
          name: "instance/getInstances",
          organizationId: values.orgId,
          roboticsClouds: [
            {
              name: values?.regionName,
              region: values?.providerRegion,
              details: true,
            },
          ],
        });

      const instances: IInstance[] = instancesMapper(
        response?.data?.data?.[0]?.roboticsClouds?.[0]
          ?.cloudInstances as IInstanceBE[],
      );

      resolve(instances);
    } catch (error) {
      reject(error);
    }
  });
}
