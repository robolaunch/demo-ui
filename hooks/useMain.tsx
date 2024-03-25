"use client";

import { MainContext } from "@/contexts/MainContext";
import { IMainHook } from "@/interfaces/main.hook.interface";
import { useContext } from "react";

const useMain = () => {
  // @ts-ignore
  const useMain: IMainHook = useContext(MainContext);

  return useMain;
};

export default useMain;
