"use client";

import Accordion from "@/components/Accordion/Accordion";
import InputText from "../InputText/InputText";
import { ReactElement } from "react";
import { FormikProps } from "formik";
import { IEnvironment } from "@/interfaces/environment.interface";
import CFLabel from "../CFLabel/CFLabel";
import CFAccordionValidLabel from "../CFAccordionValidLabel/CFAccordionValidLabel";

interface ICFHostDirectory {
  formik: FormikProps<IEnvironment>;
  index: number;
}

export default function CFHostDirectory({
  formik,
  index,
}: ICFHostDirectory): ReactElement {
  const hasErrors: boolean =
    // @ts-ignore
    formik.errors.directories?.hostDirectories?.[index]?.hostDirectory ||
    // @ts-ignore
    formik.errors.directories?.hostDirectories?.[index]?.mountPath
      ? true
      : false;

  const hasValid: boolean =
    formik.values.directories.hostDirectories[index].hostDirectory &&
    formik.values.directories.hostDirectories[index].mountPath
      ? true
      : false;

  return (
    <Accordion
      headerClassName="text-sm"
      header={
        <div className="flex items-center justify-between">
          <p>Host Directory #{index + 1}</p>
          <CFAccordionValidLabel
            type={hasErrors ? "error" : hasValid ? "valid" : null}
          />
        </div>
      }
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 py-3">
          <InputText
            label="Host Path"
            formikProps={formik.getFieldProps(
              `directories.hostDirectories[${index}].hostDirectory`,
            )}
            tooltip="Host Path is the path of the directory on the host machine that you want to mount into the container."
            touched={
              formik.touched.directories?.hostDirectories?.[index]
                ?.hostDirectory
            }
            error={
              // @ts-ignore
              formik.errors.directories?.hostDirectories?.[index]?.hostDirectory
            }
          />
          <InputText
            label="Mount Path"
            formikProps={formik.getFieldProps(
              `directories.hostDirectories[${index}].mountPath`,
            )}
            tooltip="Mount Path is the path where the host directory will be mounted inside the container."
            touched={
              formik.touched.directories?.hostDirectories?.[index]?.mountPath
            }
            error={
              // @ts-ignore
              formik.errors.directories?.hostDirectories?.[index]?.mountPath
            }
          />
        </div>
        <CFLabel
          type="remove"
          label="Remove Host Directory"
          onClick={() => {
            formik.setFieldValue(
              "directories.hostDirectories",
              formik.values.directories.hostDirectories.filter(
                (_, i) => i !== index,
              ),
            );
          }}
        />
      </div>
    </Accordion>
  );
}
