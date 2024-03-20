"use client";

import Accordion from "@/components/Accordion/Accordion";
import InputText from "../InputText/InputText";
import { ReactElement, useEffect } from "react";
import { FormikProps } from "formik";
import CFRemoveLabel from "../CFLabel/CFLabel";
import { IEnvironment } from "@/interfaces/environment.interface";
import { getPort } from "@/apis/port.api";
import useMain from "@/hooks/useMain";
import CFAccordionValidLabel from "../CFAccordionValidLabel/CFAccordionValidLabel";

interface ICFPort {
  formik: FormikProps<IEnvironment>;
  type: "ide" | "vdi" | "jupyterNotebook";
  index: number;
}

export default function CFPort({ formik, type, index }: ICFPort): ReactElement {
  function typeView(): string {
    switch (type) {
      case "ide":
        return "IDE";
      case "vdi":
        return "VDI";
      case "jupyterNotebook":
        return "Jupyter Notebook";
    }
  }

  const { selectedState } = useMain();

  useEffect(() => {
    handleGetPort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleGetPort() {
    formik.setFieldValue(
      `services.${type}.customPorts[${index}].backendPort`,
      await getPort({
        orgId: selectedState?.organization?.id!,
        regionName: selectedState?.region?.name!,
        instanceId: selectedState?.instance?.id!,
        providerRegion: selectedState?.region?.region!,
      }),
    );
  }

  const hasErrors: boolean =
    // @ts-ignore
    formik.errors.services?.[type]?.customPorts?.[index]?.name ||
    // @ts-ignore
    formik.errors.services?.[type]?.customPorts?.[index]?.port ||
    // @ts-ignore
    formik.errors.services?.[type]?.customPorts?.[index]?.backendPort
      ? true
      : false;

  const hasValid: boolean =
    formik.values.services[type].customPorts[index].name &&
    formik.values.services[type].customPorts[index].port &&
    formik.values.services[type].customPorts[index].backendPort
      ? true
      : false;

  return (
    <Accordion
      headerClassName="text-sm"
      header={
        <div className="flex items-center justify-between">
          <p>Custom Ports Exposure From {typeView()}</p>
          <CFAccordionValidLabel
            type={hasErrors ? "error" : hasValid ? "valid" : null}
          />
        </div>
      }
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 py-3">
          <InputText
            label="Port Name"
            minLength={4}
            maxLength={4}
            required
            formikProps={formik.getFieldProps(
              `services.${type}.customPorts[${index}].name`,
            )}
            touched={
              formik.touched.services?.[type]?.customPorts?.[index]?.name
            }
            // @ts-ignore
            error={formik.errors.services?.[type]?.customPorts?.[index]?.name}
            tooltip="Port Name is the name of the port that you want to expose."
          />
          <InputText
            type="number"
            label="App Port"
            formikProps={formik.getFieldProps(
              `services.${type}.customPorts[${index}].port`,
            )}
            touched={
              formik.touched.services?.[type]?.customPorts?.[index]?.port
            }
            // @ts-ignore
            error={formik.errors.services?.[type]?.customPorts?.[index]?.port}
            tooltip="Application Port is the port of the application that you want to expose. For example, if you are running a web application, you can expose port 3000 to run your application on the Service."
          />
          <InputText
            type="number"
            label="Node Port"
            disabled
            value="3000"
            formikProps={formik.getFieldProps(
              `services.${type}.customPorts[${index}].backendPort`,
            )}
            touched={
              formik.touched.services?.[type]?.customPorts?.[index]?.backendPort
            }
            error={
              // @ts-ignore
              formik.errors.services?.[type]?.customPorts?.[index]?.backendPort
            }
            tooltip="Node Port is the port of your application that you want to expose. For example, if you are running a web application, you can expose from port 3000 to run your application on the Service."
          />
        </div>
        <CFRemoveLabel
          type="remove"
          label={`Remove ${typeView()} Port #${index + 1}`}
          onClick={() => {
            formik.setFieldValue(
              `services.${type}.customPorts`,
              formik.values.services[type].customPorts.filter(
                (_, i) => i !== index,
              ),
            );
          }}
        />
      </div>
    </Accordion>
  );
}
