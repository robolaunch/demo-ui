"use client";

import PreviewForm from "@/components/PreviewForm.tsx/PreviewForm";
import CFTemplates from "@/components/CFTemplates/CFTemplates";
import CreateForm from "@/components/CreateForm/CreateForm";
import useCreate from "@/hooks/useCreate";
import { ReactElement } from "react";

export default function CreateApp(): ReactElement {
  const { formik } = useCreate();

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="hw-full grid grid-cols-12 gap-12"
    >
      <div
        className={`hw-full relative flex flex-col gap-6 overflow-auto ${formik.values.applicationConfig.application.name ? "col-span-8" : "col-span-full"}`}
      >
        {formik?.values?.applicationConfig?.application?.name ? (
          <CreateForm />
        ) : (
          <CFTemplates />
        )}
      </div>
      {formik.values.applicationConfig.application.name && (
        <div className="hw-full col-span-4">
          <PreviewForm />
        </div>
      )}
    </form>
  );
}
