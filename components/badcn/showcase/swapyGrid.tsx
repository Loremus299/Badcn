import { ReactNode } from "react";
import SwapyGrid from "../swapyGrid";

export default function SwapyGridDemo() {
  return (
    <SwapyGrid
      className="gap-2"
      initialSwapyData={[
        { id: "hi", col: 1, row: 1, node: <SwapyNode>Hi</SwapyNode> },
        { id: "try", col: 1, row: 1, node: <SwapyNode>Try</SwapyNode> },
        { id: "bye", col: 2, row: 1, node: <SwapyNode>Bye</SwapyNode> },
      ]}
    ></SwapyGrid>
  );
}

function SwapyNode({ children }: { children: ReactNode }) {
  return (
    <div className="w-12 h-8 rounded-md border border-muted text-sm tracking-wide grid place-items-center bg-foreground text-background">
      {children}
    </div>
  );
}
