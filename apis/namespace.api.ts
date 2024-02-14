import { INamespace, INamespaceBE } from "@/interfaces/namespace.interface";
import { kubernetesApi } from "./openapi";
import { namespacesMapper } from "@/handlers/namespace.handler";

export function getNamespacesAPI(values: {
  orgId: string;
  regionName: string;
  providerRegion: string;
  instanceId: string;
}): Promise<INamespace[]> {
  return new Promise<INamespace[]>(async (resolve, reject) => {
    try {
      const response: any = await kubernetesApi.getNamespaces({
        name: "namespace/getNamespaces",
        organizationId: values?.orgId,
        roboticsClouds: [
          {
            name: values?.regionName,
            cloudInstances: [
              {
                instanceId: values?.instanceId,
                region: values?.providerRegion,
              },
            ],
          },
        ],
      });

      const namespaces: INamespace[] = namespacesMapper(
        response?.data?.data?.[0]?.roboticsClouds?.[0]?.cloudInstances?.[0]
          ?.robolaunchNamespaces as INamespaceBE[],
      );

      resolve(namespaces);
    } catch (error) {
      reject(error);
    }
  });
}
