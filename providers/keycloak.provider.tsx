"use client";

import { ComponentType, Fragment, ReactElement } from "react";
import LayoutLoading from "@/components/layout.loading/layout.loading.comp";
import env from "@/providers/env.provider";
import Keycloak from "keycloak-js";
import dynamic from "next/dynamic";
interface IKeycloakProvider {
  children: Readonly<ReactElement | ReactElement[]>;
}

export default function KeycloakProvider({ children }: IKeycloakProvider) {
  const KCProvider: ComponentType<any> = dynamic(
    () =>
      import("@react-keycloak/web").then((lib) => lib.ReactKeycloakProvider),
    {
      ssr: false,
      loading: () => <LayoutLoading />,
    },
  );

  return (
    <KCProvider
      LoadingComponent={<LayoutLoading />}
      authClient={
        new Keycloak({
          url: env.KEYCLOAK_URL,
          realm: env.KEYCLOAK_REALM,
          clientId: env.KEYCLOAK_CLIENT_ID,
        })
      }
      autoRefreshToken={true}
      onTokens={(tokens: any) => {
        localStorage.setItem("rl-auth", JSON.stringify(tokens));
      }}
      initOptions={{
        useNonce: true,
        onLoad: "login-required",
        checkLoginIframe: false,
        prompt: "none",
      }}
      onEvent={(event: any, error: any) => {
        console.log("onKeycloakEvent", event, error);
      }}
    >
      <Fragment>{children}</Fragment>
    </KCProvider>
  );
}
