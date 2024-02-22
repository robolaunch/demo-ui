import { Dispatch, SetStateAction } from "react";
import { ISidebarState } from "./sidebarstate.interface";
import { IOrganization } from "./organization.interface";
import { IRegion } from "./region.interface";
import { INamespace } from "./namespace.interface";
import { IInstance } from "./instance.interface";
import { IAppState } from "./app.config.interface";
import { ITemplate } from "./template.interface";

export interface IMainHook {
  sidebarState: ISidebarState;
  setSidebarState: Dispatch<SetStateAction<ISidebarState>>;
  selectedState: ISelectedState;
  setSelectedState: Dispatch<SetStateAction<ISelectedState>>;
  templates: ITemplate[];
  setTemplates: Dispatch<SetStateAction<ITemplate[]>>;
  appState: IAppState;
  setAppState: Dispatch<SetStateAction<IAppState>>;
}

export interface ISelectedState {
  organization: IOrganization | null;
  region: IRegion | null;
  instance: IInstance | null;
  namespace: INamespace | null;
}
