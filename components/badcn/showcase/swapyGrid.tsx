import { ReactNode } from "react";
import SwapyGrid, { SwapyEdit } from "../swapyGrid";

export default function SwapyGridDemo() {
  return (
    <SwapyGrid
      className="gap-2"
      layoutStyle="grid gap-2"
      initialsCols={3}
      defaultComponent={<SwapyNode>Hi</SwapyNode>}
      initialSwapyData={[
        { id: "hi", col: 1, row: 1, node: <SwapyNode>Hi</SwapyNode> },
        { id: "try", col: 1, row: 1, node: <SwapyNode>Try</SwapyNode> },
        { id: "bye", col: 2, row: 1, node: <SwapyNode>Bye</SwapyNode> },
      ]}
    >
      <div>
        <SwapyEdit />
      </div>
    </SwapyGrid>
  );
}

function SwapyNode({ children }: { children: ReactNode }) {
  return (
    <div className="w-12 h-8 rounded-md border border-muted text-sm tracking-wide grid place-items-center bg-foreground text-background">
      {children}
    </div>
  );
}
