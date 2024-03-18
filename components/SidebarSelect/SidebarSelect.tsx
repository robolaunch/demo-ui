"use client";

import { getNamespacesAPI } from "@/apis/namespace.api";
import { getOrganizationsAPI } from "@/apis/organization.api";
import { orgNameDOM } from "@/functions/organization.function";
import useMain from "@/hooks/useMain";
import {
  IOrganization,
  IOrganizationWithNamespaces,
} from "@/interfaces/organization.interface";
import { useRouter } from "next/navigation";
import { CascadeSelect } from "primereact/cascadeselect";
import { Fragment, ReactElement, useEffect, useState } from "react";
import { IoBusinessOutline, IoFolderOutline } from "react-icons/io5";
import CreateNamespaceModal from "../ModalCreateNS/ModalCreateNS";
import { IoIosAdd } from "react-icons/io";
import CreateOrganizationModal from "../ModalCreateOrg/ModalCreateOrg";

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
          namespaces: selectedState?.instance
            ? await getNamespacesAPI({
                orgId: org.id,
                regionName: selectedState?.region?.name!,
                providerRegion: selectedState?.region?.region!,
                instanceId: selectedState?.instance?.id!,
              })
            : [],
        };
      }),
    );

    setOrganizationsWithNamespaces(orgsWithNamespaces);
  }

  const [isOpenCreateOrg, setIsOpenCreateOrg] = useState<boolean>(false);
  const [isOpenCreateNS, setIsOpenCreateNS] = useState<boolean>(false);

  const selectTemplate = (option: {
    label: string;
    value: string;
    namespaces?: { label: string; value: string }[];
  }) => {
    if (option.value === "Create Project") {
      return (
        <Fragment>
          <div
            className="flex w-full items-center justify-start text-sm"
            onClick={() => setIsOpenCreateNS(true)}
          >
            <IoIosAdd size={18} />
            <span>{option.label}</span>
          </div>
        </Fragment>
      );
    }

    if (option.value === "org_Create Organization") {
      return (
        <Fragment>
          <div
            className="flex w-full items-center justify-start text-sm"
            onClick={() => setIsOpenCreateOrg(true)}
          >
            <IoIosAdd size={18} />
            <span>{option.label}</span>
          </div>
        </Fragment>
      );
    }

    return (
      <div className="flex items-center gap-2 text-sm">
        {option.namespaces && <IoBusinessOutline />}
        {!option.namespaces && <IoFolderOutline />}
        <span>{option.label}</span>
      </div>
    );
  };

  return (
    <div className="flex items-center gap-2 py-3 pl-6 pr-3">
      <IoBusinessOutline size={26} />
      <CascadeSelect
        value={selectedState?.namespace?.name}
        placeholder="Projects"
        onChange={({ value }) => {
          if (
            value.label === "Create Project" ||
            value.label === "org_Create Organization"
          ) {
            return;
          }

          setSelectedState((prev) => {
            return {
              ...prev,
              organization: value.org,
              namespace: value.namespace,
            };
          });
          router.push("/applications");
        }}
        options={[
          ...organizationsWithNamespaces,
          { id: "", name: "org_Create Organization", namespaces: [] },
        ].map((org) => {
          return {
            label: orgNameDOM(org.name),
            value: org.name,
            namespaces: [
              ...org.namespaces.map((ns) => {
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
              {
                label: "Create Project",
                value: "Create Project",
              },
            ],
          };
        })}
        optionLabel="name"
        optionGroupLabel="name"
        className="w-full px-2 text-sm"
        optionGroupChildren={["namespaces"]}
        itemTemplate={selectTemplate}
      />
      {isOpenCreateOrg && (
        <CreateOrganizationModal onClose={() => setIsOpenCreateOrg(false)} />
      )}
      {isOpenCreateNS && (
        <CreateNamespaceModal onClose={() => setIsOpenCreateNS(false)} />
      )}
    </div>
  );
}
