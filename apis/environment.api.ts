import {
  IEnvironment,
  IEnvironmentBE,
} from "@/interfaces/environment.interface";
import { environmentApi } from "./openapi";
import {
  environmentMapper,
  environmentsMapper,
} from "@/handlers/environment.handler";
import { AxiosResponse } from "axios";

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

export async function createEnvironmentAPI(values: {
  orgId: string;
  regionName: string;
  instanceId: string;
  providerRegion: string;
  namespaceName: string;
  appName: string;
  appConfig: {
    category: string;
    image: {
      distro: string;
      desktop: string;
      version: string;
    };
    app: {
      name: string;
      version: string;
    };
  };
  ideEnabled: boolean;
  vdiEnabled: boolean;
  jupyterNotebookEnabled: boolean;
  repoURL: string;
  repoBranch: string;
}): Promise<void> {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const response: AxiosResponse<
        any,
        {
          data: any;
          success: boolean;
          message: string;
        }
      > = await environmentApi.createEnvironment({
        name: "environment/createEnvironment",
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
                    name: values?.appName,
                    fleetName: values?.namespaceName,

                    // services settings //
                    vdiEnabled: values.vdiEnabled,
                    vdiSessionCount: 4,
                    vdiGpuResource: 1,
                    ideEnabled: values.ideEnabled,
                    ideGpuResource: 1,
                    ideGpuResourceType: "nvidia.com/gpu",
                    notebookEnabled: values?.jupyterNotebookEnabled,
                    notebookGpuResource: 1,
                    // services settings //

                    // application settings //
                    domainName: values?.appConfig.category,
                    application: {
                      name: values?.appConfig?.app?.name,
                      version: values?.appConfig?.app?.version,
                    },
                    devspace: {
                      ubuntuDistro: values?.appConfig?.image?.distro,
                      desktop: values?.appConfig?.image?.desktop,
                      version: values?.appConfig?.image?.version,
                    },
                    permittedDirectories: "/home/robolaunch",
                    persistentDirectories: "/var:/etc:/opt:/usr",
                    // application settings //

                    // hardware settings //
                    storageAmount: 50,
                    gpuEnabledForCloudInstance: true,
                    // hardware settings //

                    robotWorkspaces: values.repoURL
                      ? [
                          {
                            name: "default",
                            workspaceDistro: "",
                            robotRepositories: [
                              {
                                name: "default",
                                url: values.repoURL,
                                branch: values.repoBranch,
                              },
                            ],
                          },
                        ]
                      : undefined,
                  },
                ],
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

export async function startEnvironmentAPI(values: {
  orgId: string;
  regionName: string;
  instanceId: string;
  providerRegion: string;
  namespaceName: string;
  appName: string;
}): Promise<void> {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const response = await environmentApi.startEnvironment({
        name: "environment/startEnvironment",
        organizationId: values.orgId,
        roboticsClouds: [
          {
            name: values.regionName,
            cloudInstances: [
              {
                instanceId: values.instanceId,
                region: values.providerRegion,
                environments: [
                  { fleetName: values.namespaceName, name: values.appName },
                ],
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

export async function stopEnvironmentAPI(values: {
  orgId: string;
  regionName: string;
  instanceId: string;
  providerRegion: string;
  namespaceName: string;
  appName: string;
}): Promise<void> {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const response = await environmentApi.stopEnvironment({
        name: "environment/stopEnvironment",
        organizationId: values.orgId,
        roboticsClouds: [
          {
            name: values.regionName,
            cloudInstances: [
              {
                instanceId: values.instanceId,
                region: values.providerRegion,
                environments: [
                  { fleetName: values.namespaceName, name: values.appName },
                ],
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
