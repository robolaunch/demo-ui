"use client";

import {
  savedTemplateMapper,
  templatesMapper,
} from "@/handlers/template.handler";
import { environmentApi } from "./openapi";
import {
  ISavedTemplate,
  ISavedTemplateBE,
  ITemplate,
} from "@/interfaces/template.interface";

export function getTemplates(): Promise<any> {
  return new Promise<any>(async (resolve, reject) => {
    try {
      const response: any =
        await environmentApi.getRobolaunchReadyEnvironments();

      const templates: ITemplate[] = templatesMapper(
        response?.data?.environmentData,
      );

      resolve(templates);
    } catch (error) {
      reject(error);
    }
  });
}

export function getSavedTemplates(values: {
  orgId: string;
  regionName: string;
  instanceId: string;
  providerRegion: string;
  namespaceName: string;
}): Promise<ISavedTemplate[]> {
  return new Promise<ISavedTemplate[]>(async (resolve, reject) => {
    try {
      const response: any = await environmentApi.getTemplates({
        name: "environment/getTemplates",
        organizationId: values.orgId,
        roboticsClouds: [
          {
            name: values.regionName,
            cloudInstances: [
              {
                instanceId: values.instanceId,
                region: values.providerRegion,
                environments: [{ fleetName: values.namespaceName }],
              },
            ],
          },
        ],
      });

      const savedTemplates = savedTemplateMapper(
        response?.data?.data?.[0]?.roboticsClouds?.[0]?.cloudInstances?.[0]
          ?.templates as ISavedTemplateBE[],
      );

      resolve(savedTemplates);
    } catch (error) {
      reject(error);
    }
  });
}
