import { ReactNode } from "react";
import SwapyGrid from "../swapyGrid";

export default function SwapyGridDemo() {
  return (
    <div className="p-8 w-full max-w-sm">
      <SwapyGrid
        className="gap-2"
        initialsCols={3}
        defaultComponent={<DemoDisplay>Hi</DemoDisplay>}
        initialSwapyData={[
          { id: "hi", col: 1, row: 2, node: <DemoDisplay>Hi</DemoDisplay> },
          { id: "try", col: 2, row: 1, node: <DemoDisplay>Bye</DemoDisplay> },
          { id: "bye", col: 2, row: 1, node: <DemoDisplay>Try</DemoDisplay> },
        ]}
      />
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
