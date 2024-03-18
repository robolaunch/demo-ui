"use client";

import { ReactElement } from "react";
import useVDI from "@/hooks/useVDI";
import { GiSpeaker } from "react-icons/gi";
import AppServiceControlBar from "../AppServiceControlBar/AppServiceControlBar";
import useMain from "@/hooks/useMain";

export default function VDI(): ReactElement {
  const { remoteDesktopReducer, overlay, video, handleMute } = useVDI();

  const { sidebarState } = useMain();

  return (
    <div
      className={`relative flex items-center justify-center bg-black ${sidebarState.isOpen ? "hw-full" : "hw-screen"}`}
    >
      <span
        className="my-auto h-fit w-fit appearance-none object-contain outline-none"
        ref={overlay}
        tabIndex={1}
      >
        <video
          onContextMenu={(e) => e.preventDefault()}
          playsInline
          ref={video}
          autoPlay
          className="object-contain"
          style={
            sidebarState.isOpen
              ? {}
              : {
                  maxHeight: "100vh",
                  maxWidth: "100vw",
                }
          }
          muted={remoteDesktopReducer?.isMuted}
        />
        {remoteDesktopReducer?.isMuted && (
          <div
            onClick={() => handleMute()}
            className="animate-fadeIn absolute top-0 z-10 flex h-full w-full cursor-pointer items-center justify-center bg-[#00000090] text-light-50"
          >
            <GiSpeaker size={48} />
          </div>
        )}
      </span>
      <div className="absolute bottom-4 left-4 flex items-center gap-2">
        <div
          className={`h-2.5 w-2.5 rounded ${
            remoteDesktopReducer?.controller?.displayname
              ? "bg-primary-500"
              : "bg-secondary-400"
          }`}
        />
      </div>
      <AppServiceControlBar type="vdi" />
    </div>
  );
}
