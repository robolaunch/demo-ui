import { templateFinder } from "@/functions/template.function";
import useMain from "@/hooks/useMain";
import { IEnvironment } from "@/interfaces/environment.interface";
import { ReactElement } from "react";
import {
  templateDesktopViewer,
  templateDistroViewer,
} from "@/functions/environment.function";

interface ISidebarAppItemTooltip {
  app: IEnvironment;
}

export default function SidebarAppItemTooltip({
  app,
}: ISidebarAppItemTooltip): ReactElement {
  const { templates } = useMain();

  const template = templateFinder(app, templates);

  return (
    <div className="flex flex-col gap-4 p-1">
      <p>
        <span className="font-semibold">App: </span>
        {template?.app?.alias || template?.app?.name}
      </p>
      <p>
        <span className="font-semibold">OS: </span>
        {template?.image?.os} {templateDesktopViewer(template?.image?.desktop!)}{" "}
        {templateDistroViewer(template?.image?.distro!)}
      </p>
      <p>
        <span className="font-semibold">Version: </span>
        {template?.image?.version}
      </p>
      <p>
        <span className="font-semibold">App Name: </span>
        {app.details.name}
      </p>

      <p>
        <span className="font-semibold">Host Directories: </span>
        {app.directories.hostDirectories.length} Directory Total
      </p>
      <p>
        <span className="font-semibold">Code Editor Custom Ports: </span>
        {app.services.ide.customPorts.length} Port Total
      </p>
      <p>
        <span className="font-semibold">Remote Desktop Custom Ports: </span>
        {app.services.vdi.customPorts.length} Port Total
      </p>
      <p>
        <span className="font-semibold">Jupyter Notebook Custom Ports: </span>
        {app.services.jupyterNotebook.customPorts.length} Port Total
      </p>

      <p>
        <span className="font-semibold">Persistent Directories: </span>
        {app.directories.persistentDirectories.length} Directory Total
      </p>
      <p>
        <span className="font-semibold">Granted Directories: </span>
        {app.directories.permittedDirectories.length} Directory Total
      </p>
    </div>
  );
}
