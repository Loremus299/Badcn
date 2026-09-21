import { ReactNode, useState } from "react";
import SwapyGrid, { SwapyAddItem } from "../swapyGrid";
import { toast } from "@/components/ui/toast";

export default function SwapyGridDemo() {
  const [newId, setNewId] = useState(globalThis.crypto.randomUUID());

  return (
    <div className="p-8 w-full max-w-xs">
      <SwapyGrid
        className="gap-2"
        onAdd={() => setNewId(globalThis.crypto.randomUUID())}
        initialsCols={3}
        initialSwapyData={[
          { id: "1", col: 1, row: 1, node: <DemoDisplay>🍍</DemoDisplay> },
          { id: "2", col: 2, row: 1, node: <DemoDisplay>🍓</DemoDisplay> },
          { id: "3", col: 2, row: 1, node: <DemoDisplay>🍍</DemoDisplay> },
        ]}
        onEditStart={() => toast.add({ title: "Happy Editing :3" })}
        onEditEnd={() => toast.add({ title: "Editing finished." })}
        onResize={(i) =>
          toast.add({
            title: "Slot resized",
            description: `(${i.col},${i.row})`,
          })
        }
        onSwapStart={() =>
          toast.add({ title: "Where are you gonna put this item ?" })
        }
        onSwapEnd={() => toast.add({ title: "Nice place :3" })}
      >
        <div className="w-full h-full bg-background rounded-md border grid place-items-center p-1">
          <SwapyAddItem
            id={newId}
            col={1}
            row={1}
            item={<DemoDisplay>🍓</DemoDisplay>}
            variant={"secondary"}
            className={"w-full"}
          >
            🍓 +
          </SwapyAddItem>
          <SwapyAddItem
            id={newId}
            col={1}
            row={1}
            item={<DemoDisplay>🍍</DemoDisplay>}
            variant={"secondary"}
            className={"w-full"}
          >
            🍍 +
          </SwapyAddItem>
        </div>
      </SwapyGrid>
    </div>
  );
}

function DemoDisplay({ children }: { children: ReactNode }) {
  return (
    <div className="p-2 border bg-background rounded-md w-full min-h-20 h-full grid place-items-center">
      {children}
    </div>
  );
}
