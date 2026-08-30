"use client";

import ComponentShowcaseOnly from "@/components/compShowOnly";
import LoadingButton from "@/components/registry/loadingButton";
import { useState } from "react";

export default function Show() {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <ComponentShowcaseOnly>
      <LoadingButton
        disabled={isLoading}
        onClick={async () => {
          setIsLoading(true);
          await new Promise((resolve) => setTimeout(resolve, 1000));
          setIsLoading(false);
        }}
      >
        Load on click
      </LoadingButton>
    </ComponentShowcaseOnly>
  );
}
