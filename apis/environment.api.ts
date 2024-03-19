"use client";

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
    domainName: string;
    application: {
      name: string;
      version: string;
    };
    devspace: {
      desktop: string;
      ubuntuDistro: string;
      version: string;
    };
  };
  vdiEnabled: boolean;
  jupyterNotebookEnabled: boolean;
  directories: {
    hostDirectories: string;
    permittedDirectories: string;
    persistentDirectories: string;
  };
  customPorts: {
    ide: string;
    vdi: string;
    jupyterNotebook: string;
  };
  repository: {
    url: string | undefined;
    branch: string;
  };
  sharing: {
    alias: string;
    private: boolean;
    organization: boolean;
    public: boolean;
    template: string;
  };
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
                    domainName: values?.appConfig?.domainName,
                    fleetName: values?.namespaceName,
                    gpuEnabledForCloudInstance: true,
                    vdiEnabled: values.vdiEnabled,
                    vdiSessionCount: 4,
                    vdiGpuResource: 1,
                    ideEnabled: values.vdiEnabled,
                    ideGpuResource: 1,
                    ideGpuResourceType: "nvidia.com/gpu",
                    storageAmount: 50,
                    application: {
                      name: values?.appConfig?.application?.name,
                      version: values?.appConfig?.application?.version,
                    },
                    devspace: {
                      ubuntuDistro: values?.appConfig?.devspace?.ubuntuDistro,
                      desktop: values?.appConfig?.devspace?.desktop,
                      version: values?.appConfig?.devspace?.version,
                    },
                    permittedDirectories:
                      values?.directories?.permittedDirectories,
                    persistentDirectories:
                      values?.directories?.persistentDirectories,
                    hostDirectories: values?.directories?.hostDirectories,
                    ideCustomPorts: values?.customPorts?.ide,
                    vdiCustomPorts: values?.customPorts?.vdi,
                    notebookEnabled: values.jupyterNotebookEnabled,
                    notebookGpuResource: 1,
                    notebookCustomPorts: values?.customPorts?.jupyterNotebook,
                    templateContent: values?.sharing?.template,
                    templateName: values?.sharing?.alias,
                    templatePrivate: values?.sharing?.private,
                    templateOrganizationLevelAvailable:
                      values?.sharing?.organization,
                    templatePublicLevelAvailable: values?.sharing?.public,
                    robotWorkspaces: values.repository.url
                      ? [
                          {
                            name: "default",
                            workspaceDistro: "",
                            robotRepositories: [
                              {
                                name: "default",
                                url: values.repository.url,
                                branch: values.repository.branch,
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

export async function terminateEnvironmentAPI(values: {
  orgId: string;
  regionName: string;
  instanceId: string;
  providerRegion: string;
  namespaceName: string;
  appName: string;
}) {
  return new Promise<void>(async (resolve, reject) => {
    try {
      await environmentApi.deleteEnvironment({
        name: "environment/deleteEnvironment",
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
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}
