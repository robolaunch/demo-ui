"use client";

import { ReactElement } from "react";
import Modal from "../modal/modal.comp";
import useMain from "@/hooks/useMain";
import { useFormik } from "formik";
import InputText from "../input.text/input.text.comp";
import Button from "../button/button";
import { createOrganizationAPI } from "@/apis/organization.api";

interface ICreateOrganizationModal {
  onClose: () => void;
}

export default function CreateOrganizationModal({
  onClose,
}: ICreateOrganizationModal): ReactElement {
  const { selectedState } = useMain();

  const formik = useFormik({
    initialValues: {
      name: "",
    },
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
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-12 p-6">
        <p>
          Give a name to your
          {selectedState?.organization ? " new " : " first "}
          organization.
        </p>
        <InputText
          formikProps={{ ...formik.getFieldProps("name") }}
          label="Organization Name"
        />
        <Button
          type="submit"
          label="Create Organization"
          loading={formik.isSubmitting}
        />
      </form>
    </Modal>
  );
}
