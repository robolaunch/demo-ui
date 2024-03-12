import { ICreateEnvironmentForm } from "@/interfaces/create.interface";
import { FormikProps } from "formik";
import { ReactElement } from "react";
import CFInputLabels from "../input.labels/input.labels";
import Accordion from "@/app/accordion/accordion.comp";
import { IEnvironment } from "@/interfaces/environment.interface";
import { toast } from "sonner";

interface ICFGrantedDirectories {
  formik: FormikProps<IEnvironment>;
}

export default function CFGrantedDirectories({
  formik,
}: ICFGrantedDirectories): ReactElement {
  return (
    <Accordion headerClassName="text-sm" header={`Granted Directories`}>
      <CFInputLabels
        label="Granted Directories"
        values={formik.values.directories.permittedDirectories}
        onAdd={(e) => {
          const firstLetter = e?.value?.charAt(0);

          if (firstLetter === "/") {
            formik.setFieldValue("directories.permittedDirectories", [
              ...formik.values.directories.permittedDirectories,
              e.value,
            ]);
          } else {
            toast.error("Path must start with '/'");
          }
        }}
        onRemove={(e) => {
          const remItem = e.value[0];
          const notRemoveableItems = ["/home/robolaunch"];

          if (notRemoveableItems.includes(remItem)) {
            toast.error("Cannot remove default directory");
          } else {
            formik.setFieldValue(
              "directories.permittedDirectories",
              formik.values.directories.permittedDirectories.filter(
                (item) => item !== remItem,
              ),
            );
          }
        }}
      />
    </Accordion>
  );
}
