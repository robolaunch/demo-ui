"use client";

import { FormikProps } from "formik";
import { ReactElement } from "react";
import CFInputLabels from "../CFInputLabels/CFInputLabels";
import { IEnvironment } from "@/interfaces/environment.interface";
import { toast } from "sonner";
import Accordion from "../Accordion/Accordion";
import CFAccordionValidLabel from "../CFAccordionValidLabel/CFAccordionValidLabel";

interface ICFGrantedDirectories {
  formik: FormikProps<IEnvironment>;
}

export default function CFGrantedDirectories({
  formik,
}: ICFGrantedDirectories): ReactElement {
  return (
    <Accordion
      headerClassName="text-sm"
      header={
        <div className="flex items-center justify-between">
          <p>Granted Directories</p>
          <CFAccordionValidLabel type="valid" />
        </div>
      }
    >
      <p className="pb-8 text-slate-500">
        Granted Directories are the directories that you want to grant access to
        the container. The mount path is the path where the host directory will
        be mounted inside the container.
      </p>
      <CFInputLabels
        label="Granted Directories"
        allowDuplicate={false}
        tooltip="Type the path and press Enter."
        values={formik.values.directories.permittedDirectories}
        onAdd={(e) => {
          const firstLetter = e?.value?.charAt(0);

          if (firstLetter === "/") {
            formik.setFieldValue("directories.permittedDirectories", [
              ...formik.values.directories.permittedDirectories,
              e.value,
            ]);
          } else {
            toast.error("Path must start with '/'");
          }
        }}
        onRemove={(e) => {
          const remItem = e.value[0];
          const notRemoveableItems = ["/home/robolaunch"];

          if (notRemoveableItems.includes(remItem)) {
            toast.error("Cannot remove default directory");
          } else {
            formik.setFieldValue(
              "directories.permittedDirectories",
              formik.values.directories.permittedDirectories.filter(
                (item) => item !== remItem,
              ),
            );
          }
        }}
      />
    </Accordion>
  );
}
