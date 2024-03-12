import { IEnvironment } from "@/interfaces/environment.interface";

export const environmentInitial: IEnvironment = {
  details: {
    name: "",
    isVirtualRobot: true,
    configureWorkspace: false,
    isDevelopmentMode: true,
    physicalInstanceName: "",
  },
  resources: {
    cpu: {
      allocatedCore: 0,
    },
    gpu: {
      enabledForCloudInstance: true,
      allocatedCore: 0,
    },
    memory: {
      allocatedCapacity: 0,
    },
    storage: {
      allocatedCapacity: 40,
    },
  },
  services: {
    ros: {
      isEnabled: true,
      socketEndpoint: "",
      rosDistros: [],
      podName: "",
      log: "",
    },
    vdi: {
      isEnabled: true,
      socketEndpoint: "",
      fileManagerEndpoint: "",
      customPorts: [],
      gpuAllocation: 0,
      podName: "",
      sessionCount: 2,
      log: "",
    },
    ide: {
      isEnabled: true,
      httpsEndpoint: "",
      fileManagerEndpoint: "",
      customPorts: [],
      gpuModelName: "",
      gpuAllocation: 0,
      podName: "",
      log: "",
    },
    physicalIde: {
      isEnabled: true,
      httpsEndpoint: "",
    },
    jupyterNotebook: {
      isEnabled: false,
      httpsEndpoint: "",
      fileManagerEndpoint: "",
      customPorts: [],
      gpuAllocation: 0,
      podName: "",
      log: "",
    },
  },
  directories: {
    permittedDirectories: ["/home/robolaunch"],
    persistentDirectories: ["/var", "/etc", "/opt", "/usr"],
    hostDirectories: [],
  },

  applicationConfig: {
    domainName: "plain",
    application: {
      name: "",
      version: "",
    },
    devspace: {
      desktop: "",
      ubuntuDistro: "",
      version: "",
    },
  },

  sharing: {
    private: false,
    organization: false,
    public: false,
    alias: "",
  },
  clusters: {
    environment: [],
    build: [],
    launch: [],
  },
};
