import {
  IEnvironment,
  IEnvironmentBE,
} from "@/interfaces/environment.interface";
import { environmentApi } from "./openapi";
import {
  environmentMapper,
  environmentsMapper,
} from "@/handlers/environment.handler";

export async function getEnvironmentsAPI(values: {
  orgId: string;
  regionName: string;
  instanceId: string;
  providerRegion: string;
  namespaceName: string;
}): Promise<IEnvironment[]> {
  return new Promise<IEnvironment[]>(async (resolve, reject) => {
    try {
      const response: any = await environmentApi.getEnvironments({
        name: "environment/getEnvironments",
        organizationId: values?.orgId,
        roboticsClouds: [
          {
            name: values?.regionName,
            cloudInstances: [
              {
                instanceId: values?.instanceId,
                region: values?.providerRegion,
                environments: [{ fleetName: values?.namespaceName }],
              },
            ],
          },
        ],
      });

      const environments: IEnvironment[] = environmentsMapper(
        response.data.data?.[0]?.roboticsClouds?.[0]?.cloudInstances?.[0]
          ?.environments as IEnvironmentBE[],
      );

      resolve(environments);
    } catch (error) {
      reject(error);
    }
  });
}

export async function getEnvironmentAPI(values: {
  orgId: string;
  regionName: string;
  instanceId: string;
  providerRegion: string;
  namespaceName: string;
  appName: string;
}) {
  return new Promise<IEnvironment>(async (resolve, reject) => {
    try {
      const response: any = await environmentApi.getEnvironment({
        name: "environment/getEnvironment",
        organizationId: values?.orgId,
        roboticsClouds: [
          {
            name: values?.regionName,
            cloudInstances: [
              {
                instanceId: values?.instanceId,
                region: values?.providerRegion,
                environments: [
                  {
                    fleetName: values?.namespaceName,
                    name: values?.appName,
                  },
                ],
              },
            ],
          },
        ],
      });

      const environment: IEnvironment = environmentMapper(
        response.data.data?.[0]?.roboticsClouds?.[0]?.cloudInstances?.[0]
          ?.environments?.[0] as IEnvironmentBE,
      );

      resolve(environment);
    } catch (error) {
      reject(error);
    }
  });
}
