import { ReactElement } from "react";
import Card from "../card/card.comp";
import CreateSelectedTemplateCard from "../create.selected.template.card/create.selected.template.card";
import InputText from "../input.text/input.text.comp";
import InputSwitch from "../input.switch/input.switch";
import Button from "../button/button";
import { FormikProps } from "formik";
import CreateSidebarAdvancedSettings from "../create.sidebar.advancedsettings/create.sidebar.advancedsettings";
import { IEnvironment } from "@/interfaces/environment.interface";

interface ICreateForm {
  formik: FormikProps<IEnvironment>;
}

export default function CreateForm({ formik }: ICreateForm): ReactElement {
  return (
    <Card className="hw-full flex flex-col justify-between overflow-auto p-4">
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
            formikProps={formik.getFieldProps("jupyterNotebookEnabled")}
          />
          <InputSwitch
            label="Remote Desktop:"
            checked={formik?.values?.vdiEnabled}
            formikProps={formik.getFieldProps("vdiEnabled")}
          />
          <InputSwitch
            label="Code Editor:"
            checked={formik?.values?.ideEnabled}
            disabled
          />
        </div>

        <CreateSidebarAdvancedSettings formik={formik} />
      </div>
      <div className="flex w-full gap-4">
        <Button
          className="w-full"
          disabled={formik.isSubmitting || !formik.isValid}
          loading={formik.isSubmitting}
          type="reset"
          label="Cancel"
          model="secondary"
          onClick={() => {
            formik.resetForm();
          }}
        />
        <Button
          className="w-full"
          disabled={formik.isSubmitting || !formik.isValid}
          loading={formik.isSubmitting}
          type="submit"
          label="Create Application"
          model="primary"
        />
      </div>
    </Card>
  );
}
