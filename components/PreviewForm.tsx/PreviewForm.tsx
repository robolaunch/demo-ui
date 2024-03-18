import { ReactElement } from "react";
import Card from "../Card/Card";
import CreateSelectedTemplateCard from "../create.selected.template.card/create.selected.template.card";
import { IEnvironment } from "@/interfaces/environment.interface";
import { FormikProps } from "formik";
import Button from "../Button/Button";
import PreviewFormLabels from "../PreviewFormLabels/PreviewFormLabels";

interface IPreviewForm {
  formik: FormikProps<IEnvironment>;
}

export default function PreviewForm({ formik }: IPreviewForm): ReactElement {
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
