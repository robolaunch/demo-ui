"use client";

import { ReactElement } from "react";
import Modal from "../Modal/Modal";
import useMain from "@/hooks/useMain";
import { useFormik } from "formik";
import InputText from "../InputText/InputText";
import Button from "../Button/Button";
import { createNamespaceAPI } from "@/apis/namespace.api";
import * as Yup from "yup";

interface IModalCreateNS {
  onClose?: () => void;
}

export default function ModalCreateNS({
  onClose,
}: IModalCreateNS): ReactElement {
  const { selectedState } = useMain();

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .required("Project name is required.")
        .min(3, "Minimum 3 characters.")
        .max(16, "Maximum 16 characters.")
        .lowercase("Must be lowercase.")
        .matches(
          /^[a-z0-9]+(-[a-z0-9]+)*$/,
          "Must be lowercase with hyphen (-) only in the middle.",
        ),
    }),
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
    <Modal header="Create Project" onClose={onClose}>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-8 p-6">
        <p className="font-medium">
          Give a name to your
          {selectedState?.namespace ? " new " : " first "}
          project.
        </p>
        <InputText
          formikProps={{ ...formik.getFieldProps("name") }}
          label="Project Name"
          error={formik.errors.name}
          touched={formik.touched.name}
        />
        <Button
          type="submit"
          label="Create Project"
          loading={formik.isSubmitting}
          disabled={!formik.isValid || formik.isSubmitting}
        />
      </form>
    </Modal>
  );
}
