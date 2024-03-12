export interface IEnvironment {
  details: {
    name: string;
    isVirtualRobot: boolean;
    isDevelopmentMode: boolean;
    configureWorkspace: boolean;
    physicalInstanceName: string;
  };
  resources: {
    cpu: {
      allocatedCore: number;
    };
    gpu: {
      enabledForCloudInstance: boolean;
      allocatedCore: number;
    };
    memory: {
      allocatedCapacity: number;
    };
    storage: {
      allocatedCapacity: number;
    };
  };
  services: {
    ros: {
      isEnabled: boolean;
      rosDistros: any[];
      socketEndpoint: string;
      podName: string;
      log: string;
    };
    vdi: {
      isEnabled: boolean;
      socketEndpoint: string;
      fileManagerEndpoint: string;
      customPorts: {
        name: string;
        port: string;
        backendPort: number;
      }[];
      gpuAllocation: number;
      podName: string;
      sessionCount: number;
      log: string;
    };
    ide: {
      isEnabled: boolean;
      httpsEndpoint: string;
      fileManagerEndpoint: string;
      customPorts: {
        name: string;
        port: string;
        backendPort: number;
      }[];
      gpuAllocation: number;
      gpuModelName: string;
      podName: string;
      log: string;
    };
    physicalIde: {
      isEnabled: boolean;
      httpsEndpoint: string;
    };
    jupyterNotebook: {
      isEnabled: boolean;
      httpsEndpoint: string;
      fileManagerEndpoint: string;
      gpuAllocation: number;
      customPorts: {
        name: string;
        port: string;
        backendPort: number;
      }[];
      podName: string;
      log: string;
    };
  };
  directories: {
    permittedDirectories: string[];
    persistentDirectories: string[];
    hostDirectories: {
      hostDirectory: string;
      mountPath: string;
    }[];
  };
  applicationConfig: {
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
  sharing: {
    private: boolean;
    organization: boolean;
    public: boolean;
    alias: string;
  };
  clusters: {
    environment: IEnvironmentStep1Cluster[];
    build: IEnvironmentStep1Cluster[];
    launch: IEnvironmentStep1Cluster[];
  };
}

export interface IEnvironmentStep1Cluster {
  name: string;
  status: string;
}

export interface IEnvironmentBE {
  application: {
    name: string;
    version: string;
  };
  devspace: {
    desktop: string;
    ubuntuDistro: string;
    version: string;
  };
  domainName: string;
  fleetName: string;
  ideApplicationLog: string;
  ideEnabled: boolean;
  ideFileBrowserIngressEndpoint: string;
  ideGpuModelName: string;
  ideGpuResource: number;
  ideIngressEndpoint: string;
  ideGpuResourceResource: string;
  idePodName: string;
  name: string;
  notebookEnabled: boolean;
  notebookPodName: string;
  notebookApplicationLog: string;
  notebookFileBrowserIngressEndpoint: string;
  notebookGpuResource: number;
  notebookIngressEndpoint: string;
  notebookCustomPorts: string;
  permittedDirectories: string;
  persistentDirectories: string;
  robotClusters: {
    name: string;
    robotStatus: string;
  }[];
  physicalInstance: string;
  storageAmount: number;
  vdiApplicationLog: string;
  vdiEnabled: boolean;
  vdiFileBrowserIngressEndpoint: string;
  vdiGpuResource: number;
  vdiIngressEndpoint: string;
  vdiPodName: string;
  vdiSessionCount: number;
  robotWorkspaces: {
    name: string;
    workspaceDistro: "IRON" | "HUMBLE" | "GALACTIC" | "FOXY" | "";
    robotRepositories: {
      name: string;
      url: string;
      branch: string;
    }[];
  }[];
  hostDirectories: string;
  physicalIdeIngressEndpoint: string;
  ideCustomPorts: string;
  vdiCustomPorts: string;
  bridgeEnabled: boolean;
  distributions: any[];
  bridgeIngressEndpoint: string;
  bridgePodName: string;
  bridgeApplicationLog: string;
  templateName: string;
  templateContent: string;
  templatePrivate: boolean;
  templateOrganizationLevelAvailable: boolean;
  templatePublicLevelAvailable: boolean;
}
