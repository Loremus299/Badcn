"use client";

import ComponentShowcase from "@/components/compShow";
import LoadingButton from "@/components/registry/loadingButton";
import TooltipButton from "@/components/registry/ToolTipButton";
import { CatIcon } from "lucide-react";

export default function Page() {
  return (
    <main className="grid place-items-center pt-16 gap-8">
      <div className="text-center">
        <h1 className="text-3xl font-semibold tracking-tighter">Badcn</h1>
        <h3 className="text-muted-foreground tracking-tight">
          A Shadcn++ repository.
        </h3>
      </div>
      <div className="min-h-screen grid max-w-7xl w-full grid-cols-3 gap-4 p-4">
        <ComponentShowcase
          name="Loading Button."
          description="A button with support for loading state."
          url="/loading-button"
        >
          <LoadingButton>Load on click</LoadingButton>
        </ComponentShowcase>
        <ComponentShowcase
          url="/tooltip-button"
          name="Tooltip Button."
          description="A button with tooltip and loading support."
        >
          <TooltipButton
            tip={
              <p>
                This button will make you{" "}
                <span className="text-destructive">Meow~</span>
              </p>
            }
          >
            <CatIcon />
            Meow
          </TooltipButton>
        </ComponentShowcase>
      </div>
    </main>
  );
}
