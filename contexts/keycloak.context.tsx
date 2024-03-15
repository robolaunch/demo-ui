"use client";

import Keycloak from "keycloak-js";
import { ReactElement, createContext, useEffect, useState } from "react";
import env from "@/providers/env.provider";
import LayoutLoading from "@/components/layout.loading/layout.loading.comp";

export const KeycloakContext: any = createContext<any>(null);

interface IKeycloakContext {
  children: ReactElement | ReactElement[];
}

// eslint-disable-next-line
export default ({ children }: IKeycloakContext) => {
  const [keycloak, setKeycloak] = useState<Keycloak | null>(null);

  useEffect(() => {
    const keycloakLib = new Keycloak({
      url: env.KEYCLOAK_URL,
      realm: env.KEYCLOAK_REALM,
      clientId: env.KEYCLOAK_CLIENT_ID,
    });

    function onToken(): void {
      localStorage.setItem(
        "rl-auth",
        JSON.stringify({
          idToken: keycloakLib.idToken,
          refreshToken: keycloakLib.refreshToken,
          token: keycloakLib.token,
        }),
      );
    }

    keycloakLib.onAuthSuccess = function () {
      onToken();
    };

    keycloakLib.onTokenExpired = function () {
      keycloakLib.updateToken();
    };

    keycloakLib.onAuthRefreshSuccess = function () {
      onToken();
    };

    keycloakLib
      .init({
        onLoad: "login-required",
      })
      .then((authenticated) => {
        authenticated && setKeycloak(keycloakLib);
      })
      .catch((err) => {
        console.error(err);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <KeycloakContext.Provider
      value={{
        keycloak,
      }}
    >
      {keycloak?.authenticated ? children : <LayoutLoading />}
    </KeycloakContext.Provider>
  );
};
