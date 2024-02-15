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
      key: "Version",
      value: app.applicationConfig.application.version,
    },
    {
      key: "OS",
      value: `Ubuntu`,
    },
    {
      key: "Distribution",
      value: `${app.applicationConfig.devspace.ubuntuDistro}`,
    },
    {
      key: "Desktop",
      value: app.applicationConfig.devspace.desktop,
    },
    {
      key: "IDE",
      value: <Status isReady={app.services.ide.isEnabled && app.status} />,
    },
    {
      key: "VDI",
      value: <Status isReady={app.services.vdi.isEnabled && app.status} />,
    },
  ];

  return (
    <div className="hw-full flex items-end justify-between">
      <table className="space" cellPadding={"4rem"}>
        <tbody>
          {list.map((item, index) => (
            <tr key={index} className="text-left text-sm">
              <td className="table-cell font-medium  text-gray-600">
                {item.key}:
              </td>
              <td className="table-cell text-gray-500">{item.value}</td>{" "}
            </tr>
          ))}
        </tbody>
      </table>
      <Image
        className="flex items-start justify-end"
        width={128}
        height={128}
        src={
          "https://raw.githubusercontent.com/robolaunch/trademark/main/applications/ubuntu-logo.png"
        }
        alt="app image"
      />
    </div>
  );
}
