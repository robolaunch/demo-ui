import { ReactElement } from "react";
import Card from "../card/card.comp";
import CreateSelectedTemplateCard from "../create.selected.template.card/create.selected.template.card";
import InputText from "../input.text/input.text.comp";
import InputSwitch from "../input.switch/input.switch";
import Button from "../button/button";
import { FormikProps } from "formik";
import { ICreateEnvironmentForm } from "@/interfaces/create.interface";
import CreateSidebarAdvancedSettings from "../create.sidebar.advancedsettings/create.sidebar.advancedsettings";

interface ICreateSidebar {
  formik: FormikProps<ICreateEnvironmentForm>;
}

export default function CreateSidebar({
  formik,
}: ICreateSidebar): ReactElement {
  return (
    <Card className="hw-full flex flex-col gap-10 p-4">
      <CreateSelectedTemplateCard formik={formik} />
      <InputText
        formikProps={{ ...formik.getFieldProps("name") }}
        label="Application Name"
      />
      <div className="flex flex-col gap-2">
        <InputSwitch
          label="Jupyter Notebook:"
          checked={true}
          onChange={() => {}}
          formikProps={formik.getFieldProps("jupyterNotebookEnabled")}
        />
        <InputSwitch
          label="Remote Desktop:"
          checked={true}
          onChange={() => {}}
          formikProps={formik.getFieldProps("vdiEnabled")}
        />
        <InputSwitch
          label="Code Editor:"
          checked={true}
          onChange={() => {}}
          disabled
          formikProps={formik.getFieldProps("ideEnabled")}
        />
      </div>

      <CreateSidebarAdvancedSettings formik={formik} />

      <Button
        loading={formik.isSubmitting}
        type="submit"
        label="Create Application"
      />
    </Card>
  );
}
