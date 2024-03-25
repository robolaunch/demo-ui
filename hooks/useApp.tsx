"use client";

import { AppContext } from "@/contexts/AppContext";
import { IAppHook } from "@/interfaces/app.hook.interface";
import { useContext } from "react";

const useApp = () => {
  // @ts-ignore
  const useApp: IAppHook = useContext(AppContext);

  return useApp;
};

export default useApp;
