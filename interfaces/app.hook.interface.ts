"use client";

import { Dispatch, SetStateAction } from "react";
import { IEnvironment } from "./environment.interface";

export interface IAppHook {
  appData: IEnvironment;
  setAppData: Dispatch<SetStateAction<IEnvironment | undefined>>;
}
