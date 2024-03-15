"use client";

import Accordion from "@/components/Accordion/Accordion";
import { ReactElement } from "react";
import { FormikProps } from "formik";
import CFHostDirectory from "../cf.hostdirectory/cf.hostdirectory";
import { IEnvironment } from "@/interfaces/environment.interface";
import CFLabel from "../cf.remove.label/cf.remove.label";
import { MdErrorOutline, MdOutlineCheckCircle } from "react-icons/md";
import CFAccordionValidLabel from "../CFAccordionValidLabel/CFAccordionValidLabel";

interface ICFHostDirectories {
  formik: FormikProps<IEnvironment>;
}

export default function CFHostDirectories({
  formik,
}: ICFHostDirectories): ReactElement {
  const hasErrors: boolean =
    formik.errors.directories?.hostDirectories?.length ?? 0 > 0 ? true : false;

  const hasValid: boolean = formik.values.directories.hostDirectories.every(
    (directory) => directory.hostDirectory && directory.mountPath,
  );

  return (
    <Accordion
      headerClassName="text-sm"
      header={
        <div className="flex items-center justify-between">
          <p>Host Directories</p>
          <CFAccordionValidLabel
            type={hasErrors ? "error" : hasValid ? "valid" : null}
          />
        </div>
      }
    >
      <div className="hw-full flex flex-col gap-2">
        <p className="pb-2 text-slate-500">
          Host Directories are the directories on the host machine that you want
          to mount into the container. The mount path is the path where the host
          directory will be mounted inside the container.
        </p>

        {formik.values.directories.hostDirectories.map((_, index) => (
          <CFHostDirectory key={index} index={index} formik={formik} />
        ))}
        <CFLabel
          type="add"
          label="Add Directory"
          onClick={() => {
            formik.setFieldValue("directories.hostDirectories", [
              ...formik.values.directories.hostDirectories,
              { hostDirectory: "", mountPath: "" },
            ]);
          }}
        />
      </div>
    </Accordion>
  );
}
