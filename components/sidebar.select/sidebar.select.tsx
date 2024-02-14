"use client";

import { getOrganizationsAPI } from "@/apis/organization.api";
import { getRegionsAPI } from "@/apis/region.api";
import { IOrganizationWithRegions } from "@/interfaces/organization.interface";
import Image from "next/image";
import { CascadeSelect } from "primereact/cascadeselect";
import { ReactElement, useEffect, useState } from "react";

export default function SidebarSelect(): ReactElement {
  const [organizationsWithRegions, setOrganizationsWithRegions] = useState<
    IOrganizationWithRegions[]
  >([]);

  useEffect(() => {
    !organizationsWithRegions?.length && handleGetFlow();
  }, [organizationsWithRegions?.length]);

  async function handleGetFlow() {
    const orgs = await getOrganizationsAPI();

    const regionMapper = orgs.map(async (org) => {
      return {
        ...org,
        regions: await getRegionsAPI({ orgId: org.id }),
      };
    });

    const orgsWithRegions: IOrganizationWithRegions[] =
      await Promise.all(regionMapper);

    orgsWithRegions.sort((a, b) => b.regions?.length - a.regions?.length);

    setOrganizationsWithRegions(orgsWithRegions);
  }

  useEffect(() => {
    console.log(organizationsWithRegions);
  }, [organizationsWithRegions]);

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
        options={organizationsWithRegions.map((org) => {
          return {
            label: org.name,
            value: org.name,
            regions: org.regions.map((region) => {
              return {
                label: region.name,
                value: region.name,
                org: {
                  id: org.id,
                  name: org.name,
                },
                region: region,
              };
            }),
          };
        })}
        optionLabel="name"
        optionGroupLabel="name"
        optionGroupChildren={["regions"]}
        className="w-full"
        itemTemplate={selectTemplate}
      />
    </div>
  );
}
