import Accordion from "@/app/accordion/accordion.comp";
import InputText from "../input.text/input.text.comp";
import { ReactElement, useEffect } from "react";
import { FormikProps } from "formik";
import CFRemoveLabel from "../cf.remove.label/cf.remove.label";
import { IEnvironment } from "@/interfaces/environment.interface";
import { getPort } from "@/apis/port.api";
import useMain from "@/hooks/useMain";

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

  return (
    <Accordion headerClassName="text-sm" header={`IDE Port #${index + 1}`}>
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
          />
          <InputText
            type="number"
            label="App Port"
            formikProps={formik.getFieldProps(
              `services.${type}.customPorts[${index}].port`,
            )}
          />
          <InputText
            type="number"
            label="Node Port"
            disabled
            value="3000"
            formikProps={formik.getFieldProps(
              `services.${type}.customPorts[${index}].backendPort`,
            )}
          />
        </div>
        <CFRemoveLabel
          type="remove"
          label={`Remove ${typeView()} Port #${index}`}
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
