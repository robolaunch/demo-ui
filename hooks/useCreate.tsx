"use client";

import { CreateContext } from "@/contexts/CreateContext";
import { ICreateHook } from "@/interfaces/create.hook.interface";
import { useContext } from "react";

const useCreate = () => {
  // @ts-ignore
  const useCreate: ICreateHook = useContext(CreateContext);

  return useCreate;
};

export default useCreate;
