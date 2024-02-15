import { IEnvironment } from "@/interfaces/environment.interface";
import Status from "../status/status.comp";
import { ReactElement } from "react";
import Image from "next/image";

interface IAppCardBody {
  app: IEnvironment;
}

export default function AppCardBody({ app }: IAppCardBody): ReactElement {
  const list = [
    {
      key: "Application",
      value: app.applicationConfig.application.name,
    },
    {
      key: "Application Version",
      value: app.applicationConfig.application.version,
    },
    {
      key: "Operating System",
      value: `Ubuntu ${app.applicationConfig.devspace.ubuntuDistro} (${app.applicationConfig.devspace.desktop})`,
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
        src={
          "https://raw.githubusercontent.com/robolaunch/trademark/main/applications/ubuntu-logo.png"
        }
        alt="app image"
      />
    </div>
  );
}
