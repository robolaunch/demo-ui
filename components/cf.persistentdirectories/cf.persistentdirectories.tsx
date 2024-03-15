"use client";

import CFAccordionValidLabel from "../CFAccordionValidLabel/CFAccordionValidLabel";
import { IEnvironment } from "@/interfaces/environment.interface";
import CFInputLabels from "../input.labels/input.labels";
import Accordion from "@/components/Accordion/Accordion";
import { FormikProps } from "formik";
import { ReactElement } from "react";
import { toast } from "sonner";

interface ICFPersistentDirectories {
  formik: FormikProps<IEnvironment>;
}

export default function CFPersistentDirectories({
  formik,
}: ICFPersistentDirectories): ReactElement {
  return (
    <Accordion
      headerClassName="text-sm"
      header={
        <div className="flex items-center justify-between">
          <p>Persistent Directories</p>
          <CFAccordionValidLabel type="valid" />
        </div>
      }
    >
      <p className="pb-8 text-slate-500">
        Persistent Directories are the directories that you want to persist even
        after the container is deleted. The mount path is the path where the
        host directory will be mounted inside the container.
      </p>
      <CFInputLabels
        tooltip="Type the path and press Enter."
        label="Persistent Directories"
        values={formik.values.directories.persistentDirectories}
        onAdd={(e) => {
          const firstLetter = e?.value?.charAt(0);

          if (firstLetter === "/") {
            formik.setFieldValue("directories.persistentDirectories", [
              ...formik.values.directories.persistentDirectories,
              e.value,
            ]);
          } else {
            toast.error("Path must start with '/'");
          }
        }}
        onRemove={(e) => {
          const remItem = e.value[0];
          const notRemoveableItems = ["/var", "/etc", "/opt", "/usr"];

          if (notRemoveableItems.includes(remItem)) {
            toast.error("Cannot remove default directory");
          } else {
            formik.setFieldValue(
              "directories.persistentDirectories",
              formik.values.directories.persistentDirectories.filter(
                (item) => item !== remItem,
              ),
            );
          }
        }}
      />
    </Accordion>
  );
}
