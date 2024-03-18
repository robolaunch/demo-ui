"use client";

import { Fragment, ReactElement } from "react";
interface IKeycloakProvider {
  children: Readonly<ReactElement | ReactElement[]>;
}
import { KeycloakProvider as KCProvider } from "react-keycloak-client";
import env from "./env.provider";
import LayoutLoading from "@/components/layout.loading/layout.loading.comp";

export default function KeycloakProvider({ children }: IKeycloakProvider) {
  return (
    <KCProvider
      client={{
        url: env.KEYCLOAK_URL,
        realm: env.KEYCLOAK_REALM,
        clientId: env.KEYCLOAK_CLIENT_ID,
      }}
      initOptions={{
        onLoad: "login-required",
        checkLoginIframe: false,
      }}
      autoRefreshToken
      onToken={(token) => {
        console.log("token", token);
        localStorage.setItem(
          "rl-auth",
          JSON.stringify({
            idToken: token.idToken,
            refreshToken: token.refreshToken,
            token: token.token,
          }),
        );
      }}
      onLoadingComponent={<LayoutLoading />}
    >
      <Fragment>{children}</Fragment>
    </KCProvider>
  );
}
