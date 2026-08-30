"use client";

import ComponentShowcaseOnly from "@/components/compShowOnly";
import TooltipButton from "@/components/registry/ToolTipButton";
import { useState } from "react";

export default function Show() {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <ComponentShowcaseOnly>
      <TooltipButton
        tip={
          <p>
            The button will load for 1 second <br /> if you{" "}
            <span className="underline">click</span> on it.
          </p>
        }
        props={{
          onClick: async () => {
            setIsLoading(true);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setIsLoading(false);
          },
        }}
        isLoading={isLoading}
      >
        Button
      </TooltipButton>
    </ComponentShowcaseOnly>
  );
}
