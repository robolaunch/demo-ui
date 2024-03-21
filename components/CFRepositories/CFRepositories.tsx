import { ReactElement } from "react";
import Accordion from "../Accordion/Accordion";
import CFAccordionValidLabel from "../CFAccordionValidLabel/CFAccordionValidLabel";
import useCreate from "@/hooks/useCreate";
import CFLabel from "../CFLabel/CFLabel";
import CFRepository from "../CFRepository/CFRepository";

interface ICFRepositories {
  workspaceIndex: number;
}

export default function CFRepositories({
  workspaceIndex,
}: ICFRepositories): ReactElement {
  const { formik } = useCreate();

  const hasErrors =
    // @ts-ignore
    formik.errors.workspaces?.[workspaceIndex]?.repos?.length > 0
      ? true
      : false;
  const hasValid = formik.values.workspaces[workspaceIndex].repos.every(
    (repo) => repo.name && repo.url && repo.branch,
  );

  return (
    <Accordion
      headerClassName="text-sm"
      header={
        <div className="flex items-center justify-between">
          <p>Repositories</p>
          <CFAccordionValidLabel
            type={hasErrors ? "error" : hasValid ? "valid" : null}
          />
        </div>
      }
    >
      <div className="hw-full flex flex-col gap-2">
        <p className="pb-2 text-slate-500">
          Repositories will be cloned into the workspace. You can add multiple
          repositories.
        </p>
        {formik.values.workspaces?.[workspaceIndex]?.repos.map((_, index) => (
          <CFRepository
            key={index}
            workspaceIndex={workspaceIndex}
            repositoryIndex={index}
          />
        ))}
        <CFLabel
          type="add"
          label="Add Repository"
          onClick={() => {
            formik.setFieldValue(`workspaces.[${workspaceIndex}].repos`, [
              ...formik.values.workspaces[workspaceIndex].repos,
              {
                name: "",
                url: "",
                branch: "",
              },
            ]);
          }}
        />
      </div>
    </Accordion>
  );
}
