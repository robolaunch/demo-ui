"use client";

import "animate.css";
import Head from "next/head";
import "@/styles/global.css";
import { Fragment, ReactElement } from "react";
import "@fontsource/poppins/100.css";
import "@fontsource/poppins/200.css";
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@fontsource/poppins/800.css";
import "@fontsource/poppins/900.css";
import MainLayout from "@/layouts/main.layout";
import { PrimeReactProvider } from "primereact/api";
import MainContextProvider from "@/contexts/main.context";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "react-loading-skeleton/dist/skeleton.css";
import { Toaster } from "sonner";
import Version from "@/components/version/version";
import KeycloakProvider from "./keycloak.provider";
import "primeicons/primeicons.css";

interface IMainProvider {
  children: Readonly<ReactElement | ReactElement[]>;
}

export default function MainProvider({
  children,
}: IMainProvider): ReactElement {
  return (
    <html lang="en">
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
            <PrimeReactProvider>
              <MainLayout>
                <Toaster richColors position="top-center" />
                <Version />
                <Fragment>{children}</Fragment>
              </MainLayout>
            </PrimeReactProvider>
          </MainContextProvider>
        </KeycloakProvider>
      </body>
    </html>
  );
}
