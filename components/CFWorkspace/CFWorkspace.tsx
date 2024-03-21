import { ReactElement } from "react";
import Accordion from "../Accordion/Accordion";
import CFAccordionValidLabel from "../CFAccordionValidLabel/CFAccordionValidLabel";
import useCreate from "@/hooks/useCreate";
import CFLabel from "../CFLabel/CFLabel";
import CFRepositories from "../CFRepositories/CFRepositories";
import InputText from "../InputText/InputText";

interface ICFWorkspace {
  workspaceIndex: number;
}

export default function CFWorkspace({
  workspaceIndex,
}: ICFWorkspace): ReactElement {
  const { formik } = useCreate();

  const hasErrors =
    // @ts-ignore
    formik.errors.workspaces?.[workspaceIndex]?.name ||
    // @ts-ignore
    formik.errors.workspaces?.[workspaceIndex]?.repos?.length > 0
      ? true
      : false;
  const hasValid = formik.values.workspaces[workspaceIndex].name ? true : false;

  return (
    <Accordion
      headerClassName="text-sm"
      header={
        <div className="flex items-center justify-between">
          <p>Workspace #{workspaceIndex + 1}</p>
          <CFAccordionValidLabel
            type={hasErrors ? "error" : hasValid ? "valid" : null}
          />
        </div>
      }
    >
      <div className="hw-full flex flex-col gap-8">
        <p className="pb-2 text-slate-500">
          Per workspace, you can add multiple repositories. The repositories
          will be cloned into the workspace.
        </p>
        <InputText
          label="Workspace Name"
          required
          formikProps={formik.getFieldProps(
            `workspaces[${workspaceIndex}].name`,
          )}
          touched={formik.touched.workspaces?.[workspaceIndex]?.name}
          // @ts-ignore
          error={formik.errors.workspaces?.[workspaceIndex]?.name}
          tooltip="Workspace Name is the name of the workspace that you want to create."
        />
        <CFRepositories workspaceIndex={workspaceIndex} />
        <CFLabel
          type="remove"
          label="Remove Workspace"
          onClick={() => {
            formik.setFieldValue(
              "workspaces",
              formik.values.workspaces.filter(
                (_, index) => index !== workspaceIndex,
              ),
            );
          }}
        />
      </div>
    </Accordion>
  );
}
