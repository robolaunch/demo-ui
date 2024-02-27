import { Fragment, ReactElement, useState } from "react";
import { FormikProps } from "formik";
import { ICreateEnvironmentForm } from "@/interfaces/create.interface";
import Card from "../card/card.comp";
import InputText from "../input.text/input.text.comp";
import { Message } from "primereact/message";

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
          <span className="bg-primary-50 text-primary-500 rounded-md bg-opacity-50 px-2 py-1 text-xs">
            Advanced Settings
          </span>
        </div>
      ) : (
        <Card className="flex !h-fit flex-col gap-8 p-2">
          <div className="flex w-full flex-col gap-4">
            <span className="flex items-center text-center text-sm ">
              Advanced Settings
            </span>
            <Message text="You can add a repository with your created application. Not required." />
          </div>
          <div className="flex w-full gap-2">
            <div className="w-3/5">
              <InputText
                label="Repository URL"
                formikProps={{ ...formik.getFieldProps("cpu") }}
              />
            </div>
            <div className="w-2/5">
              <InputText
                label="Branch"
                formikProps={{ ...formik.getFieldProps("cpu") }}
              />
            </div>
          </div>
        </Card>
      )}
    </Fragment>
  );
}
