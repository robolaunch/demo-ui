"use client";

import openapiAxiosInterceptor from "@/middlewares/openapi.axios.interceptor";
import {
  Configuration,
  OrganizationRepositoryImplApi,
  RobotApi,
  KubernetesApi,
  RobotBuildManagerApi,
  RobotLaunchManagerApi,
  CreateInstanceApi,
  CombinedFunctionsApi,
  MarketplaceOperationsApi,
  EnvironmentApi,
} from "@/apis/openapi-generator";

const apiConfig: Configuration = new Configuration({
  basePath: process.env.BACKEND_URL,
});

export const organizationApi: OrganizationRepositoryImplApi =
  new OrganizationRepositoryImplApi(
    apiConfig,
    process.env.BACKEND_URL,
    openapiAxiosInterceptor,
  );

export const robotApi: RobotApi = new RobotApi(
  apiConfig,
  process.env.BACKEND_URL,
  openapiAxiosInterceptor,
);

export const kubernetesApi: KubernetesApi = new KubernetesApi(
  apiConfig,
  process.env.BACKEND_URL,
  openapiAxiosInterceptor,
);

export const robotBuildManagerApi: RobotBuildManagerApi =
  new RobotBuildManagerApi(
    apiConfig,
    process.env.BACKEND_URL,
    openapiAxiosInterceptor,
  );

export const robotLaunchManagerApi: RobotLaunchManagerApi =
  new RobotLaunchManagerApi(
    apiConfig,
    process.env.BACKEND_URL,
    openapiAxiosInterceptor,
  );

export const createInstanceApi: CreateInstanceApi = new CreateInstanceApi(
  apiConfig,
  process.env.BACKEND_URL,
  openapiAxiosInterceptor,
);

export const trialApi: CombinedFunctionsApi = new CombinedFunctionsApi(
  apiConfig,
  process.env.BACKEND_URL,
  openapiAxiosInterceptor,
);

export const marketplaceApi: MarketplaceOperationsApi =
  new MarketplaceOperationsApi(
    apiConfig,
    process.env.BACKEND_URL,
    openapiAxiosInterceptor,
  );

export const environmentApi: EnvironmentApi = new EnvironmentApi(
  apiConfig,
  process.env.BACKEND_URL,
  openapiAxiosInterceptor,
);
