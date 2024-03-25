"use client";

import Head from "next/head";
import { Fragment, ReactElement } from "react";
import MainLayout from "@/layouts/main.layout";
import { PrimeReactProvider } from "primereact/api";
import MainContextProvider from "@/contexts/main.context";
import { Toaster } from "sonner";
import Version from "@/components/Version/Version";
import KeycloakProvider from "./keycloak.provider";
import HiddenFrame from "@/components/HiddenFrame/HiddenFrame";
import "@/styles/globals.css";
import "@/styles/theme.css";

interface IMainProvider {
  children: Readonly<ReactElement | ReactElement[]>;
}

export default function MainProvider({
  children,
}: IMainProvider): ReactElement {
  return (
    <html lang="en">
      <PrimeReactProvider>
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>Robolaunch</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body
          style={{
            fontFamily: "Poppins, sans-serif",
          }}
        >
          <KeycloakProvider>
            <MainContextProvider>
              <MainLayout>
                <Toaster richColors position="top-center" />
                <HiddenFrame />
                <Version />
                <Fragment>{children}</Fragment>
              </MainLayout>
            </MainContextProvider>
          </KeycloakProvider>
        </body>
      </PrimeReactProvider>
    </html>
  );
}
