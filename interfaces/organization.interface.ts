import { INamespace } from "./namespace.interface";

export interface IOrganization {
  id: string;
  name: string;
}

export interface IOrganizationWithNamespaces extends IOrganization {
  namespaces: INamespace[];
}

export interface IOrganizationBE {
  isCurrentMemberUser: boolean;
  organizationId: string;
  organizationName: string;
  organizationPathLevel: number;
  teamCount: number;
  userCount: number;
}
