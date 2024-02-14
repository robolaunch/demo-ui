import { IRegion } from "./region.interface";

export interface IOrganization {
  id: string;
  name: string;
}

export interface IOrganizationWithRegions extends IOrganization {
  regions: IRegion[];
}

export interface IOrganizationBE {
  isCurrentMemberUser: boolean;
  organizationId: string;
  organizationName: string;
  organizationPathLevel: number;
  teamCount: number;
  userCount: number;
}
