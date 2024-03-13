import { IEnvironment } from "@/interfaces/environment.interface";
import { FormikProps } from "formik";
import { ReactElement } from "react";
import { IoTerminal, IoTv } from "react-icons/io5";
import { SiJupyter } from "react-icons/si";

interface IPreviewServices {
  formik: FormikProps<IEnvironment>;
}

export default function PreviewServices({
  formik,
}: IPreviewServices): ReactElement {
  return (
    <div className="flex justify-between gap-4">
      {[
        {
          name: "ide",
          icon: () => (
            <IoTerminal
              size={20}
              className={`${formik.values.services.ide.isEnabled ? "text-primary-500" : "text-gray-400"}`}
            />
          ),
        },

        {
          name: "vdi",
          icon: () => (
            <IoTv
              size={22}
              className={`${formik.values.services.vdi.isEnabled ? "text-primary-500" : "text-gray-400"}`}
            />
          ),
        },
        {
          name: "jupyterNotebook",
          icon: () => (
            <SiJupyter
              size={21}
              className={`${formik.values.services.jupyterNotebook.isEnabled ? "text-primary-500" : "text-gray-400"}`}
            />
          ),
        },
      ]?.map((item, index) => {
        const Icon = item.icon;
        return <Icon key={index} />;
      })}
    </div>
  );
}
