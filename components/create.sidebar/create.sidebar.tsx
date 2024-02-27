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
    <Card className="hw-full flex flex-col justify-between p-4">
      <div className="flex flex-col gap-6">
        <CreateSelectedTemplateCard formik={formik} />
        <span
          style={{
            visibility:
              formik.touched?.appConfig?.image?.distro &&
              formik.errors?.appConfig?.image?.distro
                ? "visible"
                : "hidden",
          }}
          className="transition-300 mx-auto text-[0.68rem] text-red-500"
        >
          {formik.errors?.appConfig?.image?.distro}
        </span>
        <InputText
          formikProps={{ ...formik.getFieldProps("name") }}
          label="Application Name"
          touched={formik.touched.name}
          error={formik.errors.name}
        />
        <div className="flex flex-col gap-2">
          <InputSwitch
            label="Jupyter Notebook:"
            checked={formik?.values?.jupyterNotebookEnabled}
            onChange={() => {}}
            formikProps={formik.getFieldProps("jupyterNotebookEnabled")}
          />
          <InputSwitch
            label="Remote Desktop:"
            checked={formik?.values?.vdiEnabled}
            onChange={() => {}}
            formikProps={formik.getFieldProps("vdiEnabled")}
          />
          <InputSwitch
            label="Code Editor:"
            checked={formik?.values?.ideEnabled}
            onChange={() => {}}
            disabled
            formikProps={formik.getFieldProps("ideEnabled")}
          />
        </div>

        <CreateSidebarAdvancedSettings formik={formik} />
      </div>
      <Button
        disabled={formik.isSubmitting || !formik.isValid}
        loading={formik.isSubmitting}
        type="submit"
        label="Create Application"
      />
    </Card>
  );
}
