import { ReactElement } from "react";
import useVDI from "@/hooks/useVDI";
import { useKeycloak } from "react-keycloak-client";
import ToggleButton from "../ToggleButton/ToggleButton";

export default function AppServiceVDI(): ReactElement {
  const { remoteDesktopReducer, client } = useVDI();
  const keycloak = useKeycloak();

  function handleGetControl() {
    if (
      remoteDesktopReducer?.controller?.displayname ===
      keycloak?.tokenParsed?.preferred_username
    ) {
      client.current.send(JSON.stringify({ event: "control/release" }));
      return;
    }

    client.current.send(JSON.stringify({ event: "control/request" }));
  }

  return (
    <ToggleButton
      className="service-button"
      checked={
        remoteDesktopReducer?.controller?.displayname ===
        keycloak?.tokenParsed?.preferred_username
      }
      onClick={() => handleGetControl()}
      onLabel="Release Control"
      offLabel={
        remoteDesktopReducer?.controller?.displayname
          ? "Request Control"
          : "Take Control"
      }
    />
  );
}
