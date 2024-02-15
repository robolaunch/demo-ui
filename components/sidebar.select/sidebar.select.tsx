"use client";

import { getNamespacesAPI } from "@/apis/namespace.api";
import { getOrganizationsAPI } from "@/apis/organization.api";
import { orgNameDOM } from "@/functions/organization.functions";
import useMain from "@/hooks/useMain";
import {
  IOrganization,
  IOrganizationWithNamespaces,
} from "@/interfaces/organization.interface";
import { useRouter } from "next/navigation";
import { CascadeSelect } from "primereact/cascadeselect";
import { ReactElement, useEffect, useState } from "react";
import { IoBusinessOutline, IoFolderOutline } from "react-icons/io5";

export default function SidebarSelect(): ReactElement {
  const [organizationsWithNamespaces, setOrganizationsWithNamespaces] =
    useState<IOrganizationWithNamespaces[]>([]);

  const { selectedState, setSelectedState } = useMain();

  const router = useRouter();

  useEffect(() => {
    !organizationsWithNamespaces?.length &&
      selectedState?.instance &&
      handleGetFlow();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedState]);

  async function handleGetFlow() {
    const orgs: IOrganization[] = await getOrganizationsAPI();

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

    setOrganizationsWithNamespaces(orgsWithNamespaces);
  }

  const selectTemplate = (option: {
    label: string;
    value: string;
    namespaces?: { label: string; value: string }[];
  }) => {
    return (
      <div className="flex items-center gap-2">
        {option.namespaces && <IoBusinessOutline />}
        {!option.namespaces && <IoFolderOutline />}
        <span>{option.label}</span>
      </div>
    );
  };

  return (
    <div className="flex items-center py-4 pl-10">
      <IoBusinessOutline size={22} />
      <CascadeSelect
        value={selectedState?.namespace?.name}
        placeholder="Project"
        onChange={({ value }) => {
          setSelectedState((prev) => {
            return {
              ...prev,
              organization: value.org,
              namespace: value.namespace,
            };
          });
          router.push("/applications");
        }}
        options={organizationsWithNamespaces.map((org) => {
          return {
            label: orgNameDOM(org.name),
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
        className="w-full"
        optionGroupChildren={["namespaces"]}
        itemTemplate={selectTemplate}
      />
    </div>
  );
}
