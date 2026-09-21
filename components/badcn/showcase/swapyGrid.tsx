import { ReactNode, useState } from "react";
import SwapyGrid, { SwapyAddItem } from "../swapyGrid";

export default function SwapyGridDemo() {
  const [newId, setNewId] = useState(globalThis.crypto.randomUUID());

  return (
    <div className="p-8 w-full max-w-xs">
      <SwapyGrid
        className="gap-2"
        onAdd={() => setNewId(globalThis.crypto.randomUUID())}
        initialsCols={3}
        initialSwapyData={[
          { id: "hi", col: 1, row: 1, node: <DemoDisplay>Hi</DemoDisplay> },
          { id: "try", col: 2, row: 1, node: <DemoDisplay>Bye</DemoDisplay> },
          { id: "bye", col: 2, row: 1, node: <DemoDisplay>Try</DemoDisplay> },
        ]}
      >
        <SwapyAddItem
          id={newId}
          col={1}
          row={1}
          item={<DemoDisplay>TRy</DemoDisplay>}
        >
          +
        </SwapyAddItem>
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
