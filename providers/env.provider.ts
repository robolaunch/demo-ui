"use client";

const env: {
  BACKEND_URL: string;
  KEYCLOAK_URL: string;
  KEYCLOAK_REALM: string;
  KEYCLOAK_CLIENT_ID: string;
} = {
  BACKEND_URL: process.env.BACKEND_URL!,
  KEYCLOAK_URL: process.env.KEYCLOAK_URL!,
  KEYCLOAK_REALM: process.env.KEYCLOAK_REALM!,
  KEYCLOAK_CLIENT_ID: process.env.KEYCLOAK_CLIENT_ID!,
};

export default env;
