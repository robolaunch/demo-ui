"use client";

import { ReactElement } from "react";
import PreviewFormLabels from "../PreviewFormLabels/PreviewFormLabels";
import CreateSelectedTemplateCard from "../create.selected.template.card/create.selected.template.card";
import useCreate from "@/hooks/useCreate";
import Button from "../Button/Button";
import Card from "../Card/Card";

export default function PreviewForm(): ReactElement {
  const { formik } = useCreate();

  return (
    <Card className="hw-full flex flex-col justify-between   p-5 text-sm">
      <div className="flex flex-col gap-4">
        <CreateSelectedTemplateCard formik={formik} />
        <PreviewFormLabels formik={formik} />
      </div>
      <div className="flex w-full gap-2">
        <Button
          className="w-full"
          disabled={formik.isSubmitting}
          type="reset"
          label="Cancel"
          model="secondary"
          onClick={() => {
            formik.resetForm();
          }}
        />
        <Button
          className="w-full"
          disabled={formik.isSubmitting || !formik.isValid}
          loading={formik.isSubmitting}
          type="submit"
          label="Create"
          model="primary"
        />
      </div>
    </Card>
  );
}
