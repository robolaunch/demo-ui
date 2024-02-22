import { ReactElement } from "react";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import env from "@/providers/env.provider";
import Keycloak from "keycloak-js";
import LayoutLoading from "@/components/layout.loading/layout.loading.comp";
interface IKeycloakProvider {
  children: Readonly<ReactElement | ReactElement[]>;
}

export default function KeycloakProvider({ children }: IKeycloakProvider) {
  return (
    <ReactKeycloakProvider
      LoadingComponent={<LayoutLoading />}
      authClient={
        new Keycloak({
          url: env.KEYCLOAK_URL,
          realm: env.KEYCLOAK_REALM,
          clientId: env.KEYCLOAK_CLIENT_ID,
        })
      }
      autoRefreshToken={true}
      onTokens={(tokens) => {
        localStorage.setItem("rl-auth", JSON.stringify(tokens));
      }}
      initOptions={{
        useNonce: true,
        onLoad: "login-required",
        checkLoginIframe: false,
        prompt: "none",
      }}
      onEvent={(event, error) => {
        console.log("onKeycloakEvent", event, error);
      }}
    >
      {children}
    </ReactKeycloakProvider>
  );
}
