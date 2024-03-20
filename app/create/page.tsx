"use client";

import CreateTemplatesMapper from "@/components/CreateTemplatesMapper/CreateTemplatesMapper";
import { ReactElement } from "react";
import CreateForm from "@/components/CreateForm/CreateForm";
import PreviewForm from "@/components/PreviewForm.tsx/PreviewForm";
import useCreate from "@/hooks/useCreate";

export default function CreateApp(): ReactElement {
  const { formik } = useCreate();

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="hw-full grid grid-cols-12 gap-12"
    >
      <div
        className={`hw-full  flex flex-col gap-6 overflow-auto ${formik.values.applicationConfig.application.name ? "col-span-8" : "col-span-full"}`}
      >
        {formik?.values?.applicationConfig?.application?.name ? (
          <CreateForm />
        ) : (
          <CreateTemplatesMapper />
        )}
      </div>
      {formik.values.applicationConfig.application.name && (
        <div className="hw-full col-span-4 overflow-auto">
          <PreviewForm />
        </div>
      )}
    </form>
  );
}
