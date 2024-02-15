"use client";

import { AppContext } from "@/contexts/app.context";
import { useContext } from "react";

const useApp = () => {
  // @ts-ignore
  const useApp: IAppHook = useContext(AppContext);

  return useApp;
};

export default useApp;
