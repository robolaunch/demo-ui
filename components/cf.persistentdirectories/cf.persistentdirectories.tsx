import { FormikProps } from "formik";
import { ReactElement } from "react";
import CFInputLabels from "../input.labels/input.labels";
import Accordion from "@/app/accordion/accordion.comp";
import { IEnvironment } from "@/interfaces/environment.interface";
import { toast } from "sonner";

interface ICFPersistentDirectories {
  formik: FormikProps<IEnvironment>;
}

export default function CFPersistentDirectories({
  formik,
}: ICFPersistentDirectories): ReactElement {
  return (
    <Accordion headerClassName="text-sm" header={`Persistent Directories`}>
      <CFInputLabels
        label="Persistent Directories"
        values={formik.values.directories.persistentDirectories}
        onAdd={(e) => {
          const firstLetter = e?.value?.charAt(0);

          if (firstLetter === "/") {
            formik.setFieldValue("directories.persistentDirectories", [
              ...formik.values.directories.persistentDirectories,
              e.value,
            ]);
          } else {
            toast.error("Path must start with '/'");
          }
        }}
        onRemove={(e) => {
          const remItem = e.value[0];
          const notRemoveableItems = ["/var", "/etc", "/opt", "/usr"];

          if (notRemoveableItems.includes(remItem)) {
            toast.error("Cannot remove default directory");
          } else {
            formik.setFieldValue(
              "directories.persistentDirectories",
              formik.values.directories.persistentDirectories.filter(
                (item) => item !== remItem,
              ),
            );
          }
        }}
      />
    </Accordion>
  );
}
