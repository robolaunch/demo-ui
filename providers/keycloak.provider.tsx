"use client";

import { Fragment, ReactElement } from "react";
interface IKeycloakProvider {
  children: Readonly<ReactElement | ReactElement[]>;
}
import KeycloakContext from "@/contexts/keycloak.context";

export default function KeycloakProvider({ children }: IKeycloakProvider) {
  return (
    <KeycloakContext>
      <Fragment>{children}</Fragment>
    </KeycloakContext>
  );
}
