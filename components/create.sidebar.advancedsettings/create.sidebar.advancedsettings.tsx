import { Fragment, ReactElement, useState } from "react";
import { FormikProps } from "formik";
import { ICreateEnvironmentForm } from "@/interfaces/create.interface";
import CreateSidebarHostDirectories from "../create.sidebar.hostdirectories/create.sidebar.hostdirectories.comp";

interface ICreateSidebarAdvancedSettings {
  formik: FormikProps<ICreateEnvironmentForm>;
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
        <CreateSidebarHostDirectories formik={formik} />
      )}
    </Fragment>
  );
}
