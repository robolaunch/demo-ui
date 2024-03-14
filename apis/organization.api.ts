"use client";

import {
  IOrganization,
  IOrganizationBE,
} from "@/interfaces/organization.interface";
import { organizationApi } from "./openapi";
import { orgsMapper } from "@/handlers/organization.handler";

export async function createOrganizationAPI(values: {
  orgName: string;
}): Promise<void> {
  return new Promise<void>(async (resolve, reject) => {
    try {
      await organizationApi.createOrganization({
        name: values.orgName,
      });
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

export async function getOrganizationsAPI(): Promise<IOrganization[]> {
  return new Promise<IOrganization[]>(async (resolve, reject) => {
    try {
      const response: any = await organizationApi.getOrganizations();

      const orgs: IOrganization[] = orgsMapper(
        response.data.data as IOrganizationBE[],
      );

      resolve(orgs);
    } catch (error) {
      reject(error);
    }
  });
}
