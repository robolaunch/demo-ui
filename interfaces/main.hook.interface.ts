import { Dispatch, SetStateAction } from "react";
import { ISidebarState } from "./sidebarstate.interface";
import { IOrganization } from "./organization.interface";
import { IEnvironment } from "./environment.interface";
import { INamespace } from "./namespace.interface";
import { IInstance } from "./instance.interface";
import { ITemplate } from "./template.interface";
import { IRegion } from "./region.interface";

export interface IMainHook {
  sidebarState: ISidebarState;
  setSidebarState: Dispatch<SetStateAction<ISidebarState>>;
  selectedState: ISelectedState;
  setSelectedState: Dispatch<SetStateAction<ISelectedState>>;
  templates: ITemplate[];
  setTemplates: Dispatch<SetStateAction<ITemplate[]>>;
  applications: IEnvironment[];
  setApplications: Dispatch<SetStateAction<IEnvironment[]>>;
}

export interface ISelectedState {
  organization: IOrganization | null;
  region: IRegion | null;
  instance: IInstance | null;
  namespace: INamespace | null;
}
