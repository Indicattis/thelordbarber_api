import { useState } from "react";

export default function useProcess() {
  const [processing, setProcessing] = useState<boolean>(false);

  function processInit() {
    setProcessing(true);
  }

  function processEnd() {
    setProcessing(false);
  }

  return { processing, processInit, processEnd };
}
