import { ReactElement } from "react";
import Accordion from "../Accordion/Accordion";
import CFAccordionValidLabel from "../CFAccordionValidLabel/CFAccordionValidLabel";
import useCreate from "@/hooks/useCreate";
import CFLabel from "../CFLabel/CFLabel";

interface ICFRepository {
  workspaceIndex: number;
  repositoryIndex: number;
}

export default function CFRepository({
  workspaceIndex,
  repositoryIndex,
}: ICFRepository): ReactElement {
  const { formik } = useCreate();

  const hasErrors = false;
  const hasValid = true;

  return (
    <Accordion
      headerClassName="text-sm"
      header={
        <div className="flex items-center justify-between">
          <p>Repository #{repositoryIndex + 1} </p>
          <CFAccordionValidLabel
            type={hasErrors ? "error" : hasValid ? "valid" : null}
          />
        </div>
      }
    >
      <div className="hw-full flex flex-col gap-2">
        <p className="pb-2 text-slate-500">
          Repository will be cloned into the workspace.
        </p>

        <>FORM</>
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
