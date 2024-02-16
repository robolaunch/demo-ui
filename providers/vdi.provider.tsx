"use client";

import WEBRTCProvider from "@/contexts/vdi.context";
import { ReactElement } from "react";

interface IVDIProvider {
  children: ReactElement | ReactElement[];
}

export default function VDIProvider({ children }: IVDIProvider): ReactElement {
  return <WEBRTCProvider>{children}</WEBRTCProvider>;
}
