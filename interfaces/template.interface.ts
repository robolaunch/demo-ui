import { IEnvironment } from "./environment.interface";

export interface ITemplateBE {
  domainName: string;
  application: {
    name: string;
    version: string;
    alias: string;
    description: string;
    icon: string;
  };
  devspace: {
    ubuntuDistro: string;
    desktop: string;
    version: string;
  };
}

export interface ITemplate {
  category: string;
  image: {
    os: string;
    distro: string;
    desktop: string;
    version: string;
  };
  app: {
    name: string;
    version: string;
    alias: string;
    description: string;
    icon: string;
  };
  env?: IEnvironment | null;
}

export interface ICategory {
  category: string;
  alias: string;
}

export interface ISavedTemplateBE {
  environmentName: string;
  fleetName: string;
  organizationId: string;
  templateContent: string;
  templateName: string;
  templateType: string;
  userName: string;
}

export interface ISavedTemplate {
  name: string;
  type: ISavedTemplateTypes;
  template: IEnvironment;
}

export type ISavedTemplateTypes = "public" | "organizational" | "private";
