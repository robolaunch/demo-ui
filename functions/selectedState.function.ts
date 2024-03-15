"use client";

import { getInstancesAPI } from "@/apis/instance.api";
import { getNamespacesAPI } from "@/apis/namespace.api";
import { getOrganizationsAPI } from "@/apis/organization.api";
import { getRegionsAPI } from "@/apis/region.api";
import { IInstance } from "@/interfaces/instance.interface";
import { ISelectedState } from "@/interfaces/main.hook.interface";
import { INamespace } from "@/interfaces/namespace.interface";
import { IOrganization } from "@/interfaces/organization.interface";
import { IRegion } from "@/interfaces/region.interface";

export const selectedStateInitial: ISelectedState = {
  organization: null,
  region: null,
  instance: null,
  namespace: null,
};

export function selectedStateInitialGetter(): ISelectedState {
  if (typeof localStorage !== "undefined") {
    return JSON.parse(
      localStorage.getItem("selectedState") ||
        JSON.stringify(selectedStateInitial),
    );
  } else {
    return selectedStateInitial;
  }
}

export function selectedStateInitialSetter(selectedState: ISelectedState) {
  selectedState?.namespace &&
    localStorage.setItem("selectedState", JSON.stringify(selectedState));
}

export function selectedStateDataSetter(
  selectedState: ISelectedState,
): Promise<{
  orgs: IOrganization[];
  instances: IInstance[];
  regions: IRegion[];
  namespaces: INamespace[];
}> {
  return new Promise(async (resolve, reject) => {
    try {
      const orgs: IOrganization[] = await getOrganizationsAPI();

      const regions: IRegion[] =
        orgs?.length && !selectedState?.region
          ? await getRegionsAPI({ orgId: orgs?.[0]?.id })
          : [];

      const instances: IInstance[] =
        regions?.length && !selectedState?.instance
          ? await getInstancesAPI({
              orgId: orgs?.[0]?.id,
              regionName: regions?.[0]?.name,
              providerRegion: regions?.[0]?.region,
            })
          : [];

      const namespaces: INamespace[] =
        instances?.length && !selectedState?.namespace
          ? await getNamespacesAPI({
              orgId: orgs?.[0]?.id,
              regionName: regions?.[0]?.name,
              providerRegion: regions?.[0]?.region,
              instanceId: instances?.[0]?.id,
            })
          : [];

      resolve({
        orgs,
        instances,
        regions,
        namespaces,
      });
    } catch (error) {
      reject(error);
    }
  });
}
