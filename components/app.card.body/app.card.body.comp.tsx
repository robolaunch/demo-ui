import { IEnvironment } from "@/interfaces/environment.interface";
import Status from "../status/status.comp";
import { ReactElement } from "react";
import Image from "next/image";
import useMain from "@/hooks/useMain";
import {
  templateDesktopViewer,
  templateDistroViewer,
} from "@/functions/environment.function";

interface IAppCardBody {
  app: IEnvironment;
}

export default function AppCardBody({ app }: IAppCardBody): ReactElement {
  const { templates } = useMain();

  const currentTemplate = templates.find(
    (template) =>
      app.applicationConfig.application.name === template.app.name &&
      app.applicationConfig.application.version === template.app.version &&
      app.applicationConfig.devspace.ubuntuDistro === template.image.distro &&
      app.applicationConfig.devspace.desktop === template.image.desktop &&
      app.applicationConfig.devspace.version === template.image.version,
  );

  const list = [
    {
      key: "Application",
      value: `${currentTemplate?.app.alias} - ${currentTemplate?.app.version}`,
    },
    {
      key: "Version",
      value: currentTemplate?.image.version,
    },
    {
      key: "Operating System",
      value: `Ubuntu ${templateDistroViewer(app.applicationConfig.devspace.ubuntuDistro)} - ${templateDesktopViewer(app.applicationConfig.devspace.desktop)}`,
    },
    {
      key: "Code Editor",
      value: (
        <Status
          isReady={app.services.ide.isEnabled && app.status}
          textWeight="text-xs"
          iconSize={2}
        />
      ),
    },
    {
      key: "Remote Desktop",
      value: (
        <Status
          isReady={app.services.vdi.isEnabled && app.status}
          textWeight="text-xs"
          iconSize={2}
        />
      ),
    },
  ];

  return (
    <div className="hw-full flex items-end justify-between">
      <table className="space" cellPadding={"4rem"}>
        <tbody>
          {list.map((item, index) => (
            <tr key={index} className="text-left text-xs">
              <td className="table-cell font-medium  text-slate-600">
                {item.key}:
              </td>
              <td className="table-cell text-slate-500">{item.value}</td>{" "}
            </tr>
          ))}
        </tbody>
      </table>
      <Image
        className="flex items-start justify-end"
        width={56}
        height={56}
        src={currentTemplate?.app.icon! || "/icons/rocket.svg"}
        alt="app image"
      />
    </div>
  );
}
