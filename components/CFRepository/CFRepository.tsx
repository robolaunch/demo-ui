import { ReactElement } from "react";
import Accordion from "../Accordion/Accordion";
import CFAccordionValidLabel from "../CFAccordionValidLabel/CFAccordionValidLabel";
import useCreate from "@/hooks/useCreate";
import CFLabel from "../CFLabel/CFLabel";
import InputText from "../InputText/InputText";

interface ICFRepository {
  workspaceIndex: number;
  repositoryIndex: number;
}

export default function CFRepository({
  workspaceIndex,
  repositoryIndex,
}: ICFRepository): ReactElement {
  const { formik } = useCreate();

  const hasErrors: boolean = // @ts-ignore
    (formik.errors.workspaces?.[workspaceIndex]?.repos?.[repositoryIndex]
      ?.name ||
      // @ts-ignore
      formik.errors.workspaces?.[workspaceIndex]?.repos?.[repositoryIndex]
        ?.url ||
      // @ts-ignore
      formik.errors.workspaces?.[workspaceIndex]?.repos?.[repositoryIndex]
        ?.branch) ??
    0 > 0
      ? true
      : false;

  const hasValid: boolean =
    formik.values.workspaces[workspaceIndex].repos[repositoryIndex].name &&
    formik.values.workspaces[workspaceIndex].repos[repositoryIndex].url &&
    formik.values.workspaces[workspaceIndex].repos[repositoryIndex].branch
      ? true
      : false;

  return (
    <Accordion
      headerClassName="text-sm"
      header={
        <div className="flex items-center justify-between">
          <p>
            Repository #{repositoryIndex + 1}
            {formik.values.workspaces?.[workspaceIndex]?.repos?.[
              repositoryIndex
            ]?.name &&
              ` (${formik.values.workspaces?.[workspaceIndex]?.repos?.[repositoryIndex]?.name})`}
          </p>
          <CFAccordionValidLabel
            type={hasErrors ? "error" : hasValid ? "valid" : null}
          />
        </div>
      }
    >
      <div className="hw-full flex flex-col gap-6">
        <p className="pb-2 text-slate-500">
          Repository will be cloned into the workspace.
        </p>
        <div className="flex gap-4">
          <InputText
            label="Repository Name"
            required
            formikProps={formik.getFieldProps(
              `workspaces[${workspaceIndex}].repos[${repositoryIndex}].name`,
            )}
            touched={
              formik.touched.workspaces?.[workspaceIndex]?.repos?.[
                repositoryIndex
              ]?.name
            }
            error={
              // @ts-ignore
              formik.errors.workspaces?.[workspaceIndex]?.repos?.[
                repositoryIndex
              ]?.name
            }
            tooltip="Repository Name is the name of the repository that you want to clone."
          />
          <InputText
            label="Repository URL"
            required
            formikProps={formik.getFieldProps(
              `workspaces[${workspaceIndex}].repos[${repositoryIndex}].url`,
            )}
            touched={
              formik.touched.workspaces?.[workspaceIndex]?.repos?.[
                repositoryIndex
              ]?.url
            }
            error={
              // @ts-ignore
              formik.errors.workspaces?.[workspaceIndex]?.repos?.[
                repositoryIndex
              ]?.url
            }
            tooltip="Repository URL is the URL of the repository that you want to clone."
          />
          <InputText
            label="Repository Branch"
            required
            formikProps={formik.getFieldProps(
              `workspaces[${workspaceIndex}].repos[${repositoryIndex}].branch`,
            )}
            touched={
              formik.touched.workspaces?.[workspaceIndex]?.repos?.[
                repositoryIndex
              ]?.branch
            }
            error={
              // @ts-ignore
              formik.errors.workspaces?.[workspaceIndex]?.repos?.[
                repositoryIndex
              ]?.branch
            }
            tooltip="Repository Branch is the branch of the repository that you want to clone."
          />
        </div>
        <CFLabel
          type="remove"
          label="Remove Repository"
          onClick={() => {
            formik.setFieldValue(
              `workspaces[${workspaceIndex}].repos`,
              formik.values.workspaces[workspaceIndex].repos.filter(
                (_, index) => index !== repositoryIndex,
              ),
            );
          }}
        />
      </div>
    </Accordion>
  );
}
