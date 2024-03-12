import { Fragment, ReactElement, useState } from "react";
import { FormikProps } from "formik";
import CreateSidebarHostDirectories from "../cf.hostdirectories/cf.hostdirectories";
import CFCustomPorts from "../cf.customports/cf.customports";
import CFPersistentDirectories from "../cf.persistentdirectories/cf.persistentdirectories";
import CFGrantedDirectories from "../cf.granteddirectories/cf.granteddirectories";
import { IEnvironment } from "@/interfaces/environment.interface";

interface ICreateSidebarAdvancedSettings {
  formik: FormikProps<IEnvironment>;
}

export default function CreateSidebarAdvancedSettings({
  formik,
}: ICreateSidebarAdvancedSettings): ReactElement {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  return (
    <Fragment>
      {!isOpened ? (
        <div
          className="flex cursor-pointer items-center justify-center"
          onClick={() => setIsOpened(!isOpened)}
        >
          <span className="rounded-md bg-primary-50 bg-opacity-50 px-2 py-1 text-xs text-primary-500">
            Advanced Settings
          </span>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <CreateSidebarHostDirectories formik={formik} />
          <CFCustomPorts formik={formik} type="ide" />
          <CFCustomPorts formik={formik} type="vdi" />
          <CFCustomPorts formik={formik} type="jupyterNotebook" />
          <CFPersistentDirectories formik={formik} />
          <CFGrantedDirectories formik={formik} />
        </div>
      )}
    </Fragment>
  );
}
