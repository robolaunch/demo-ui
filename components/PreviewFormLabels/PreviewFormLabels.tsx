import { IEnvironment } from "@/interfaces/environment.interface";
import { FormikProps } from "formik";
import { Fragment, ReactElement } from "react";

interface IPreviewFormLabels {
  formik: FormikProps<IEnvironment>;
}

export default function PreviewFormLabels({
  formik,
}: IPreviewFormLabels): ReactElement {
  const list: {
    label: string;
    value: string | number | ReactElement;
    desc: string | null;
  }[] = [
    {
      label: "Applicaton Name",
      value: formik.values.details.name,
      desc: null,
    },
    {
      label: "Host Directories",
      value: formik.values.directories.hostDirectories.length,
      desc: " Directory Total",
    },
    {
      label: "Persistent Directories",
      value: formik.values.directories.persistentDirectories?.length,
      desc: " Directory Total",
    },
    {
      label: "Granted Directories",
      value: formik.values.directories.permittedDirectories?.length,
      desc: " Directory Total",
    },
    {
      label: "Code Editor Custom Ports",
      value: formik.values.services.ide.customPorts.length,
      desc: " Port Total",
    },
    {
      label: "Remote Desktop Custom Ports",
      value: formik.values.services.vdi.customPorts.length,
      desc: " Port Total",
    },
    {
      label: "Jupyter Notebook Custom Ports",
      value: formik.values.services.jupyterNotebook.customPorts.length,
      desc: " Port Total",
    },
  ];

  return (
    <div className="flex flex-col gap-6 p-4 text-sm">
      {list.map((item, index) => {
        return (
          <Fragment key={index}>
            {Boolean(item.value) && (
              <div className="flex justify-between">
                <span className="font-medium">{item.label}:</span>
                <span>
                  {item.value} {item.desc}
                </span>
              </div>
            )}
          </Fragment>
        );
      })}
    </div>
  );
}
