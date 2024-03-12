import {
  IEnvironment,
  IEnvironmentBE,
} from "@/interfaces/environment.interface";

function handleMapper(data: IEnvironmentBE[]): IEnvironment[] {
  return (
    data?.map((env) => {
      return {
        details: {
          name: env?.name,
          isVirtualRobot: env?.physicalInstance ? false : true,
          isDevelopmentMode: false,
          configureWorkspace: false,
          physicalInstanceName: env?.physicalInstance,
        },
        resources: {
          cpu: {
            allocatedCore: 0,
          },
          gpu: {
            enabledForCloudInstance: env?.vdiGpuResource > 0 ? true : false,
            allocatedCore:
              Number(env?.ideGpuResource || 0) +
              Number(env?.notebookGpuResource || 0) +
              Number(env?.vdiGpuResource || 0),
          },
          memory: {
            allocatedCapacity: 0,
          },
          storage: {
            allocatedCapacity: Number(env?.storageAmount || 0),
          },
        },
        services: {
          ros: {
            isEnabled: env?.bridgeEnabled,
            rosDistros: env?.distributions,
            socketEndpoint: env?.bridgeIngressEndpoint,
            podName: env?.bridgePodName,
            log: env?.bridgeApplicationLog,
          },

          vdi: {
            isEnabled: env?.vdiEnabled,
            socketEndpoint: env?.vdiIngressEndpoint,
            fileManagerEndpoint: env?.vdiFileBrowserIngressEndpoint,
            customPorts:
              env?.vdiCustomPorts?.split("/")?.map((item: string) => {
                return {
                  name: item?.split("-")[0],
                  port: item?.split("-")[1].split(":")[1],
                  backendPort: Number(item?.split("-")[1].split(":")[0]),
                };
              }) || [],
            gpuAllocation: env?.vdiGpuResource,
            podName: env?.vdiPodName,
            sessionCount: env?.vdiSessionCount,
            log: env?.vdiApplicationLog,
          },
          ide: {
            isEnabled: env?.ideEnabled,
            httpsEndpoint: env?.ideIngressEndpoint,
            fileManagerEndpoint: env?.ideFileBrowserIngressEndpoint,
            customPorts:
              env?.ideCustomPorts?.split("/")?.map((item: string) => {
                return {
                  name: item?.split("-")[0],
                  port: item?.split("-")[1].split(":")[1],
                  backendPort: Number(item?.split("-")[1].split(":")[0]),
                };
              }) || [],
            gpuAllocation: env?.ideGpuResource,
            gpuModelName: env?.ideGpuModelName,
            podName: env?.idePodName,
            log: env?.ideApplicationLog,
          },
          physicalIde: {
            isEnabled: env?.physicalIdeIngressEndpoint ? true : false,
            httpsEndpoint: env?.physicalIdeIngressEndpoint,
          },
          jupyterNotebook: {
            isEnabled: env?.notebookEnabled,
            httpsEndpoint: env?.notebookIngressEndpoint,
            fileManagerEndpoint: env?.notebookFileBrowserIngressEndpoint,
            gpuAllocation: env?.notebookGpuResource,
            customPorts:
              env?.notebookCustomPorts?.split("/")?.map((item: string) => {
                return {
                  name: item?.split("-")[0],
                  port: item?.split("-")[1].split(":")[1],
                  backendPort: Number(item?.split("-")[1].split(":")[0]),
                };
              }) || [],
            podName: env?.notebookPodName,
            log: env?.notebookApplicationLog,
          },
        },
        directories: {
          permittedDirectories: env?.permittedDirectories?.split(":"),
          persistentDirectories: env?.persistentDirectories?.split(":"),
          hostDirectories:
            env?.hostDirectories?.split(",")?.map((item: string) => {
              console.log("hostDirectories", item?.split(":")[0]);

              return {
                hostDirectory: item?.split(":")[0],
                mountPath: item?.split(":")[1],
              };
            }) || [],
        },
        applicationConfig: {
          domainName: env?.domainName,
          application: env?.application,
          devspace: env?.devspace,
        },
        clusters: {
          environment: env?.robotClusters?.map(
            (cluster: { name: string; robotStatus: string }) => {
              return {
                name: cluster.name,
                status: cluster.robotStatus,
              };
            },
          ),
          build: [],
          launch: [],
        },
        sharing: {
          alias: env?.templateName,
          private: env?.templatePrivate,
          organization: env?.templateOrganizationLevelAvailable,
          public: env?.templatePublicLevelAvailable,
        },
        status: Boolean(
          env?.robotClusters?.some(
            (cluster) => cluster.robotStatus === "EnvironmentReady",
          ),
        ),
      };
    }) || []
  );
}

export function environmentsMapper(data: IEnvironmentBE[]): IEnvironment[] {
  return handleMapper(data);
}

export function environmentMapper(data: IEnvironmentBE): IEnvironment {
  return handleMapper([data])?.[0] || null;
}
