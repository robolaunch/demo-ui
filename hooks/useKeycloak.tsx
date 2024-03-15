"use client";

import { KeycloakContext } from "@/contexts/keycloak.context";
import { useContext } from "react";
import Keycloak from "keycloak-js";

const useKeycloak = () => {
  // @ts-ignore
  const useKeycloak: {
    keycloak: Keycloak;
  } = useContext(KeycloakContext);

  return useKeycloak;
};

export default useKeycloak;
