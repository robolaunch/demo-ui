"use client";

export interface IVDIHook {
  client: any;
  handleMute: () => void;
  handleSendMessage: (message: string) => void;
  overlay: any;
  remoteDesktopReducer: any;
  setScreenResolution: () => void;
  video: any;
}
