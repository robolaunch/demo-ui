import { IRegion, IRegionBE } from "@/interfaces/region.interface";
import { regionsMapper } from "@/handlers/region.handler";
import { createInstanceApi } from "./openapi";

export async function createRegionAPI(values: {
  orgId: string;
  regionName: string;
  providerRegion: string;
}): Promise<void> {
  return new Promise<void>(async (resolve, reject) => {
    try {
      await createInstanceApi.createRoboticsCloud({
        name: "region/createRegionAPI",
        organizationId: values.orgId,
        roboticsClouds: [
          { name: values.regionName, region: values.providerRegion },
        ],
      });

      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

export async function getRegionsAPI(values: {
  orgId: string;
}): Promise<IRegion[]> {
  return new Promise<IRegion[]>(async (resolve, reject) => {
    try {
      const response: any = await createInstanceApi.getRoboticsClouds({
        name: "region/getRegionsAPI",
        organizationId: values.orgId,
      });

      const regions: IRegion[] = regionsMapper(
        response?.data?.data?.[0]?.roboticsClouds as IRegionBE[],
      );

      resolve(regions);
    } catch (error) {
      reject(error);
    }
  });
}
