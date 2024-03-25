"use client";

import { VDIContext } from "@/contexts/VDIContext";
import { IVDIHook } from "@/interfaces/vdi.hook.interface";
import { useContext } from "react";

const useVDI = () => {
  // @ts-ignore
  const useVDI: IVDIHook = useContext(VDIContext);

  return useVDI;
};

export default useVDI;
