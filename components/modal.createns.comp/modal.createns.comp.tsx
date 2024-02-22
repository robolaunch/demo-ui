import { ReactElement } from "react";
import Modal from "../modal/modal.comp";
import useMain from "@/hooks/useMain";
import { useFormik } from "formik";
import InputText from "../input.text/input.text.comp";
import Button from "../button/button";
import { createNamespaceAPI } from "@/apis/namespace.api";

interface ICreateNamespaceModal {
  onClose: () => void;
}

export default function CreateNamespaceModal({
  onClose,
}: ICreateNamespaceModal): ReactElement {
  const { selectedState } = useMain();

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit: async () => {
      formik.setSubmitting(true);
      await createNamespaceAPI({
        orgId: selectedState?.organization?.id!,
        regionName: selectedState?.region?.name!,
        providerRegion: selectedState?.region?.region!,
        instanceId: selectedState?.instance?.id!,
        namespaceName: formik.values.name,
      });
      setTimeout(() => window.location.reload(), 1000);
    },
  });

  return (
    <Modal header="Create Namespace" onClose={onClose}>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-12 p-6">
        <p>
          Give a name to your
          {selectedState?.namespace ? " new " : " first "}
          namespace.
        </p>
        <InputText
          formikProps={{ ...formik.getFieldProps("name") }}
          label="Namespace Name"
        />
        <Button
          type="submit"
          label="Create Namespace"
          loading={formik.isSubmitting}
        />
      </form>
    </Modal>
  );
}
