import SwapyGrid, { SwapyEdit } from "../swapyGrid";

export default function SwapyGridDemo() {
  return (
    <div className="p-16 w-full max-w-sm">
      <SwapyGrid
        className="gap-2"
        layoutStyle="grid gap-2"
        initialsCols={3}
        defaultComponent={<div>Hi</div>}
        initialSwapyData={[
          { id: "hi", col: 1, row: 2, node: <div>Hi</div> },
          { id: "try", col: 2, row: 1, node: <div>Hi</div> },
          { id: "bye", col: 2, row: 1, node: <div>Hi</div> },
        ]}
      >
        <div>
          <SwapyEdit />
        </div>
      </SwapyGrid>
    </div>
  );
}
