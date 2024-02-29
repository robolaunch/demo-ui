import { IEnvironment } from "@/interfaces/environment.interface";

export function applicationFinder(
  apps: IEnvironment[],
  appName: string,
): IEnvironment {
  return apps?.find((app) => app?.details?.name === appName) as IEnvironment;
}

export function getApplicationStatus(app: IEnvironment): string {
  return app?.clusters?.environment?.length
    ? app?.clusters?.environment?.find(
        (env) => env.status !== "EnvironmentReady",
      )?.status || "EnvironmentReady"
    : "Unreachable Status";
}

export function templateDesktopViewer(value: string): string {
  if (value?.includes("xfce")) {
    return "XFCE";
  }
  return value;
}

export function templateDistroViewer(value: string): string {
  if (value?.includes("focal")) {
    return "Focal Fossa";
  }

  if (value?.includes("jammy")) {
    return "Jammy Jellyfish";
  }

  return value;
}
