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
import { Fragment, ReactElement, useEffect, useState } from "react";
import { IoBusinessOutline, IoFolderOutline } from "react-icons/io5";
import CreateNamespaceModal from "../modal.createns.comp/modal.createns.comp";
import { IoIosAdd, IoIosAddCircleOutline } from "react-icons/io";
import CreateOrganizationModal from "../modal.createorg.comp/modal.createorg.comp";

export default function SidebarSelect(): ReactElement {
  const [organizationsWithNamespaces, setOrganizationsWithNamespaces] =
    useState<IOrganizationWithNamespaces[]>([]);

  const { selectedState, setSelectedState } = useMain();

  const router = useRouter();

  useEffect(() => {
    !organizationsWithNamespaces?.length && handleGetFlow();
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
            className="absolute inset-0 flex items-center px-6 py-4"
            onClick={() => setIsOpenCreateNS(true)}
          >
            <div className="flex items-center gap-2 text-sm">
              <IoIosAdd size={18} />
              <span>{option.label}</span>
            </div>
          </div>
        </Fragment>
      );
    }

    if (option.value === "org_Create Organization") {
      return (
        <Fragment>
          <div
            className="absolute inset-0 flex h-11 w-full items-center"
            onClick={() => setIsOpenCreateOrg(true)}
          >
            <div className="mx-4 flex items-center gap-2 text-sm">
              <IoIosAdd size={18} />
              <span>{option.label}</span>
            </div>
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
    <div className="flex items-center gap-2 py-3 pl-6">
      <IoBusinessOutline size={26} />
      <CascadeSelect
        value={selectedState?.namespace?.name}
        placeholder="Projects"
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
        className="w-full text-sm"
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
