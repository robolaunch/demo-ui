import { IEnvironment } from "@/interfaces/environment.interface";
import GroupButtons from "../GroupButtons/GroupButtons";
import { FormikProps } from "formik";
import { Fragment, ReactElement } from "react";
import InputText from "../InputText/InputText";

interface ICFTemplate {
  formik: FormikProps<IEnvironment>;
}

export default function CFTemplate({ formik }: ICFTemplate): ReactElement {
  const buttonClassNames = "h-8 text-xs font-medium";

  return (
    <div className="flex flex-col gap-7">
      <div className="flex items-center justify-between gap-1 text-sm">
        <label className="w-32">Save Template:</label>
        <GroupButtons
          buttons={[
            {
              label: "None",
              type: "button",
              icon: "pi pi-lock",
              className: buttonClassNames,
              model:
                formik.values.sharing.private ||
                formik.values.sharing.organization ||
                formik.values.sharing.public
                  ? "secondary"
                  : "primary",
              onClick: () => {
                formik.setValues({
                  ...formik.values,
                  sharing: {
                    alias: "",
                    private: false,
                    organization: false,
                    public: false,
                  },
                } as IEnvironment);
              },
            },
            {
              label: "Private",
              type: "button",
              icon: "pi pi-lock-open",
              className: buttonClassNames,
              model: formik.values.sharing.private
                ? formik.values.sharing.organization
                  ? "secondary"
                  : "primary"
                : "secondary",

              onClick: () => {
                formik.setValues({
                  ...formik.values,
                  sharing: {
                    ...formik.values.sharing,
                    private: true,
                    organization: false,
                    public: false,
                  },
                } as IEnvironment);
              },
            },
            {
              label: "Organization",
              type: "button",
              icon: "pi pi-users",
              className: buttonClassNames,
              model: formik.values.sharing.organization
                ? formik.values.sharing.public
                  ? "secondary"
                  : "primary"
                : "secondary",
              onClick: () => {
                formik.setValues({
                  ...formik.values,
                  sharing: {
                    ...formik.values.sharing,
                    private: true,
                    organization: true,
                    public: false,
                  },
                } as IEnvironment);
              },
            },
            {
              label: "Public",
              type: "button",
              icon: "pi pi-globe",
              className: buttonClassNames,
              model: formik.values.sharing.public ? "primary" : "secondary",
              onClick: () => {
                formik.setValues({
                  ...formik.values,
                  sharing: {
                    ...formik.values.sharing,
                    private: true,
                    organization: true,
                    public: true,
                  },
                } as IEnvironment);
              },
            },
          ]}
        />
      </div>
      <Fragment>
        {(formik.values.sharing.private ||
          formik.values.sharing.organization ||
          formik.values.sharing.public) && (
          <InputText
            formikProps={{ ...formik.getFieldProps("sharing.alias") }}
            label="Template Name"
            tooltip="Template Name is the name of the template that you want to create."
            touched={formik.touched.sharing?.alias}
            error={formik.errors.sharing?.alias}
          />
        )}
      </Fragment>
    </div>
  );
}
