import useMain from "@/hooks/useMain";
import { ReactElement, useEffect, useState } from "react";

export default function HiddenFrame(): ReactElement {
  const [iframeKey, setIframeKey] = useState<number>(0);

  const { applications } = useMain();

  useEffect(() => {
    setIframeKey((prev) => prev + 1);
  }, [applications]);

  return (
    <iframe
      key={iframeKey}
      allow="clipboard-read"
      className="absolute -top-[9999px]"
      src={applications?.[0]?.services?.ide?.httpsEndpoint}
    />
  );
}
