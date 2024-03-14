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
          tooltip="Application Name is the name of the application that you want to create."
          touched={formik.touched.details?.name}
          error={formik.errors.details?.name}
        />
        <div className="flex flex-col gap-2">
          <InputSwitch
            label="Code Editor:"
            checked={formik?.values?.services?.ide?.isEnabled}
            tooltip="Code Editor is a web-based code editor that is used to write and run code."
            onChange={() =>
              toast.info(
                "Code Editor not closable, it is required for application to run.",
              )
            }
          />
          <InputSwitch
            label="Remote Desktop:"
            checked={formik?.values?.services?.vdi?.isEnabled}
            tooltip="Remote Desktop is a remote desktop that is used to run GUI applications."
            formikProps={formik.getFieldProps("services.vdi.isEnabled")}
          />

          <InputSwitch
            label="Jupyter Notebook:"
            checked={formik?.values?.services?.jupyterNotebook?.isEnabled}
            tooltip="Jupyter Notebook is an open-source web application that allows you to create and share documents that contain live code, equations, visualizations, and narrative text."
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
