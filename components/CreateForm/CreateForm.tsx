import { ReactElement } from "react";
import Card from "../card/card.comp";
import InputText from "../InputText/InputText";
import InputSwitch from "../input.switch/input.switch";
import { FormikProps } from "formik";
import CreateSidebarAdvancedSettings from "../create.sidebar.advancedsettings/create.sidebar.advancedsettings";
import { IEnvironment } from "@/interfaces/environment.interface";
import { toast } from "sonner";

interface ICreateForm {
  formik: FormikProps<IEnvironment>;
}

export default function CreateForm({ formik }: ICreateForm): ReactElement {
  return (
    <Card className="hw-full flex flex-col justify-between overflow-auto p-12">
      <div className="flex flex-col gap-8">
        <InputText
          formikProps={{ ...formik.getFieldProps("details.name") }}
          label="Application Name"
          touched={formik.touched.details?.name}
          error={formik.errors.details?.name}
        />
        <div className="flex flex-col gap-2">
          <InputSwitch
            label="Code Editor:"
            checked={formik?.values?.services?.ide?.isEnabled}
            disabled
            onChange={() =>
              toast.warning(
                "Code Editor not closable, it is required for application to run.",
              )
            }
          />
          <InputSwitch
            label="Remote Desktop:"
            checked={formik?.values?.services?.vdi?.isEnabled}
            formikProps={formik.getFieldProps("services.vdi.isEnabled")}
          />

          <InputSwitch
            label="Jupyter Notebook:"
            checked={formik?.values?.services?.jupyterNotebook?.isEnabled}
            formikProps={formik.getFieldProps(
              "services.jupyterNotebook.isEnabled",
            )}
          />
        </div>
        <CreateSidebarAdvancedSettings formik={formik} />
      </div>
    </Card>
  );
}
