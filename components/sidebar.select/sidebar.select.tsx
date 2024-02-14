"use client";

import { getNamespacesAPI } from "@/apis/namespace.api";
import { getOrganizationsAPI } from "@/apis/organization.api";
import { getRegionsAPI } from "@/apis/region.api";
import useMain from "@/hooks/useMain";
import { INamespace } from "@/interfaces/namespace.interface";
import {
  IOrganization,
  IOrganizationWithNamespaces,
} from "@/interfaces/organization.interface";
import Image from "next/image";
import { CascadeSelect } from "primereact/cascadeselect";
import { ReactElement, useEffect, useState } from "react";

export default function SidebarSelect(): ReactElement {
  const [organizationsWithNamespaces, setOrganizationsWithNamespaces] =
    useState<IOrganizationWithNamespaces[]>([]);

  const { selectedState } = useMain();

  useEffect(() => {
    !organizationsWithNamespaces?.length &&
      selectedState?.instance &&
      handleGetFlow();
  }, [selectedState]);

  async function handleGetFlow() {
    const orgs: IOrganization[] = await getOrganizationsAPI();

    console.log("orgs", orgs);

    const orgsWithNamespaces: IOrganizationWithNamespaces[] = await Promise.all(
      orgs.map(async (org) => {
        return {
          ...org,
          namespaces: await getNamespacesAPI({
            orgId: org.id,
            regionName: selectedState?.region?.name!,
            providerRegion: selectedState?.region?.region!,
            instanceId: selectedState?.instance?.id!,
          }),
        };
      }),
    );

    console.log("orgsWithNamespaces", orgsWithNamespaces);

    setOrganizationsWithNamespaces(orgsWithNamespaces);
  }

  useEffect(() => {
    console.log(organizationsWithNamespaces);
  }, [organizationsWithNamespaces]);

  const selectTemplate = (option: {
    label: string;
    value: string;
    regions?: { label: string; value: string }[];
  }) => {
    return (
      <div className="align-items-center flex gap-2">
        {option.regions && (
          <Image width={20} height={20} src={"/icons/org.svg"} alt="org" />
        )}
        {!option.regions && (
          <Image width={20} height={20} src={"/icons/org.svg"} alt="org" />
        )}
        <span>{option.label}</span>
      </div>
    );
  };

  return (
    <div className="card justify-content-center flex">
      <CascadeSelect
        value={undefined}
        placeholder="Project"
        onChange={(e) => {
          console.log(e);
        }}
        options={organizationsWithNamespaces.map((org) => {
          return {
            label: org.name,
            value: org.name,
            namespaces: org.namespaces.map((ns) => {
              return {
                label: ns.name,
                value: ns.name,
                org: {
                  id: org.id,
                  name: org.name,
                },
                namespace: ns,
              };
            }),
          };
        })}
        optionLabel="name"
        optionGroupLabel="name"
        optionGroupChildren={["namespaces"]}
        className="w-full"
        itemTemplate={selectTemplate}
      />
    </div>
  );
}
