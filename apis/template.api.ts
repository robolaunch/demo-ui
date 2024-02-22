"use client";

import { templatesMapper } from "@/handlers/template.handler";
import { environmentApi } from "./openapi";
import { ITemplate } from "@/interfaces/template.interface";

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
