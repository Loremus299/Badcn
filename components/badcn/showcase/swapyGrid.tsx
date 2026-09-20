import { ReactNode } from "react";
import SwapyGrid, { SwapyEdit } from "../swapyGrid";

export default function SwapyGridDemo() {
  return (
    <div className="p-16 w-full max-w-sm">
      <SwapyGrid
        className="gap-2"
        layoutStyle="grid gap-2"
        initialsCols={3}
        defaultComponent={<DemoDisplay>Hi</DemoDisplay>}
        initialSwapyData={[
          { id: "hi", col: 1, row: 2, node: <DemoDisplay>Hi</DemoDisplay> },
          { id: "try", col: 2, row: 1, node: <DemoDisplay>Hi</DemoDisplay> },
          { id: "bye", col: 2, row: 1, node: <DemoDisplay>Hi</DemoDisplay> },
        ]}
      >
        <div>
          <SwapyEdit />
        </div>
      </SwapyGrid>
    </div>
  );
}

function DemoDisplay({ children }: { children: ReactNode }) {
  return (
    <div className="p-2 border bg-background rounded-md w-full h-full">
      {children}
    </div>
  );
}
