import { ReactElement } from "react";
import Image from "next/image";

export default function AppCardBody(): ReactElement {
  return (
    <div className="hw-full flex items-end justify-between">
      <div className="col-span-1 row-span-3 pt-4">
        <ul className="flex flex-col gap-2">
          <li className="text-sm text-gray-500">
            <span className="font-medium">App Version:</span> 1.0.0
          </li>
          <li className="text-sm text-gray-500">
            <span className="font-medium">App Version:</span> 1.0.0
          </li>
          <li className="text-sm text-gray-500">
            <span className="font-medium">App Version:</span> 1.0.0
          </li>
          <li className="text-sm text-gray-500">
            <span className="font-medium">App Version:</span> 1.0.0
          </li>
          <li className="text-sm text-gray-500">
            <span className="font-medium">App Version:</span> 1.0.0
          </li>
          <li className="text-sm text-gray-500">
            <span className="font-medium">App Version:</span> 1.0.0
          </li>
          <li className="text-sm text-gray-500">
            <span className="font-medium">App Version:</span> 1.0.0
          </li>
        </ul>
      </div>
      <div className="col-span-1 row-span-3 flex items-start justify-end">
        <Image
          className="border border-slate-200"
          width={128 + 64 - 16 - 16}
          height={128 + 64 - 16 - 16}
          src={
            "https://raw.githubusercontent.com/robolaunch/trademark/main/applications/ubuntu-logo.png"
          }
          alt="app image"
        />
      </div>
    </div>
  );
}
