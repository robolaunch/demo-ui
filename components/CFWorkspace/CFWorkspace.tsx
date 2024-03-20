import { ReactElement } from "react";
import Accordion from "../Accordion/Accordion";
import CFAccordionValidLabel from "../CFAccordionValidLabel/CFAccordionValidLabel";
import useCreate from "@/hooks/useCreate";
import CFLabel from "../CFLabel/CFLabel";
import CFRepositories from "../CFRepositories/CFRepositories";

interface ICFWorkspace {
  workspaceIndex: number;
}

export default function CFWorkspace({
  workspaceIndex,
}: ICFWorkspace): ReactElement {
  const { formik } = useCreate();

  const hasErrors = false;
  const hasValid = true;

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
      <div className="hw-full flex flex-col gap-2">
        <p className="pb-2 text-slate-500">
          Per workspace, you can add multiple repositories. The repositories
          will be cloned into the workspace.
        </p>

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
