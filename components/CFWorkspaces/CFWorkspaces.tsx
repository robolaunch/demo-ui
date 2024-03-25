import { IEnvironment } from "@/interfaces/environment.interface";
import { FormikProps } from "formik";
import { ReactElement } from "react";
import CFAccordionValidLabel from "../CFAccordionValidLabel/CFAccordionValidLabel";
import Accordion from "../Accordion/Accordion";
import CFLabel from "../CFLabel/CFLabel";
import CFWorkspace from "../CFWorkspace/CFWorkspace";

interface ICFWorkspaces {
  formik: FormikProps<IEnvironment>;
}

export default function CFWorkspaces({ formik }: ICFWorkspaces): ReactElement {
  const hasErrors = formik.errors.workspaces?.length ?? 0 > 0 ? true : false;
  const hasValid = formik.values.workspaces?.every(
    (workspace) => workspace.name,
  );

  return (
    <Accordion
      headerClassName="text-sm"
      header={
        <div className="flex items-center justify-between">
          <p>Workspaces</p>
          <CFAccordionValidLabel
            type={hasErrors ? "error" : hasValid ? "valid" : null}
          />
        </div>
      }
    >
      <div className="hw-full flex flex-col gap-2">
        <p className="pb-2 text-slate-500">
          Workspaces included the GitHub repositories. The repositories will be
          cloned into the workspace.
        </p>

        {formik.values.workspaces.map((_, index) => (
          <CFWorkspace key={index} workspaceIndex={index} />
        ))}
        <CFLabel
          type="add"
          label="Add Workspace"
          onClick={() => {
            formik.setFieldValue("workspaces", [
              ...formik.values.workspaces,
              {
                name: "",
                repos: [
                  {
                    name: "",
                    url: "",
                    branch: "",
                  },
                ],
              },
            ]);
          }}
        />
      </div>
    </Accordion>
  );
}
