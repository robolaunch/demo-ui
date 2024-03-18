import {
  startEnvironmentAPI,
  stopEnvironmentAPI,
  terminateEnvironmentAPI,
} from "@/apis/environment.api";
import { ReactElement, useState } from "react";
import Modal from "../Modal/Modal";
import useMain from "@/hooks/useMain";
import Button from "../Button/Button";

interface IModalAppEvents {
  type: "start" | "stop" | "terminate";
  onClose: () => void;
  appName: string;
}

export default function ModalAppEvents({
  type,
  onClose,
  appName,
}: IModalAppEvents): ReactElement {
  const { selectedState } = useMain();

  const [loading, setLoading] = useState<boolean>(false);

  async function handleStartEnvironment() {
    await startEnvironmentAPI({
      orgId: selectedState?.organization?.id!,
      regionName: selectedState?.region?.name!,
      providerRegion: selectedState?.region?.region!,
      instanceId: selectedState?.instance?.id!,
      namespaceName: selectedState?.namespace?.name!,
      appName: appName,
    });
  }

  async function handleStopEnvironment() {
    await stopEnvironmentAPI({
      orgId: selectedState?.organization?.id!,
      regionName: selectedState?.region?.name!,
      providerRegion: selectedState?.region?.region!,
      instanceId: selectedState?.instance?.id!,
      namespaceName: selectedState?.namespace?.name!,
      appName: appName,
    });
  }

  async function handleTerminateEnvironment() {
    await terminateEnvironmentAPI({
      orgId: selectedState?.organization?.id!,
      regionName: selectedState?.region?.name!,
      providerRegion: selectedState?.region?.region!,
      instanceId: selectedState?.instance?.id!,
      namespaceName: selectedState?.namespace?.name!,
      appName: appName,
    });
  }

  return (
    <Modal
      header={(() => {
        switch (type) {
          case "start":
            return "Start Application";
          case "stop":
            return "Stop Application";
          case "terminate":
            return "Terminate Application";
        }
      })()}
      onClose={onClose}
    >
      <div className="flex flex-col gap-8 p-6">
        <p className="font-medium">
          Are you sure you want to{" "}
          {(() => {
            switch (type) {
              case "start":
                return "start";
              case "stop":
                return "stop";
              case "terminate":
                return "terminate";
            }
          })()}{" "}
          the application?
        </p>
        <Button
          onClick={async () => {
            setLoading(true);
            switch (type) {
              case "start":
                await handleStartEnvironment();
                break;
              case "stop":
                await handleStopEnvironment();
                break;
              case "terminate":
                await handleTerminateEnvironment();
                break;
            }
            onClose();
          }}
          label={(() => {
            switch (type) {
              case "start":
                return "Start Application";
              case "stop":
                return "Stop Application";
              case "terminate":
                return "Terminate Application";
            }
          })()}
          disabled={loading}
          loading={loading}
          type="button"
        />
      </div>
    </Modal>
  );
}
