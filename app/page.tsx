"use client";
import ToolTipButton from "@/components/registry/ToolTipButton";
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
        <div>
          <div className="w-full aspect-video border bg-card/25 rounded-md @container grid place-items-center">
            <ToolTipButton
              isLoading={true}
              tip={
                <p className="text-muted">
                  This button will make you{" "}
                  <span className="text-destructive">MEOW!!</span>
                </p>
              }
            >
              <CatIcon />
              Meow
            </ToolTipButton>
          </div>
          <div className="-mt-12 ml-3 text-sm">
            <h6>Tool Tip Button.</h6>
            <p className="text-muted-foreground text-xs">
              A button and a tooltip.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
