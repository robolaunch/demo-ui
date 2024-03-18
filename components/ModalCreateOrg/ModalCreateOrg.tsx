"use client";

import { ReactElement } from "react";
import Modal from "../Modal/Modal";
import useMain from "@/hooks/useMain";
import { useFormik } from "formik";
import InputText from "../InputText/InputText";
import Button from "../Button/Button";
import { createOrganizationAPI } from "@/apis/organization.api";
import * as Yup from "yup";

interface IModalCreateOrg {
  onClose?: () => void;
}

export default function ModalCreateOrg({
  onClose,
}: IModalCreateOrg): ReactElement {
  const { selectedState } = useMain();

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .required("Organization name is required.")
        .min(3, "Minimum 3 characters.")
        .max(16, "Maximum 16 characters.")
        .lowercase("Must be lowercase."),
    }),
    onSubmit: async () => {
      formik.setSubmitting(true);
      await createOrganizationAPI({
        orgName: formik.values.name,
      });
      setTimeout(() => window.location.reload(), 1000);
    },
  });

  return (
    <Modal header="Create Organization" onClose={onClose}>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-8 p-6">
        <p className="font-medium">
          Give a name to your
          {selectedState?.organization ? " new " : " first "}
          organization.
        </p>
        <InputText
          formikProps={{ ...formik.getFieldProps("name") }}
          label="Organization Name"
          error={formik.errors.name}
          touched={formik.touched.name}
        />
        <Button
          type="submit"
          label="Create Organization"
          loading={formik.isSubmitting}
          disabled={!formik.isValid || formik.isSubmitting}
        />
      </form>
    </Modal>
  );
}
