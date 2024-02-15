import { ReactElement } from "react";
import Image from "next/image";

export default function KeycloakLoading(): ReactElement {
  return (
    <div className="animate-fadeIn absolute inset-0 z-50 flex flex-col items-center justify-center bg-slate-100">
      <Image
        src="/icons/ring.svg"
        width={64}
        height={64}
        alt=""
        className="bg-light-50 w-28 animate-spin rounded-full shadow"
      />
      <Image
        src="/icons/rocket.svg"
        width={64}
        height={64}
        alt=""
        className="fixed w-14 animate-pulse pb-1"
      />
    </div>
  );
}
