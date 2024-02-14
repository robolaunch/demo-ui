"use client";

import { ReactElement } from "react";
import "@/styles/global.css";
import MainContextProvider from "@/contexts/main.context";
import MainLayout from "@/layouts/main.layout";
import Head from "next/head";
import "animate.css";
import "@fontsource/poppins/100.css";
import "@fontsource/poppins/200.css";
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@fontsource/poppins/800.css";
import "@fontsource/poppins/900.css";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-cyan/theme.css";

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
        <MainContextProvider>
          <PrimeReactProvider>
            <MainLayout>{children}</MainLayout>
          </PrimeReactProvider>
        </MainContextProvider>
      </body>
    </html>
  );
}
