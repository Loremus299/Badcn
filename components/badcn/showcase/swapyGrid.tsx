import { LucideMinus, LucidePlus } from "lucide-react";
import {
  SwapyColAdd,
  SwapyColDisplay,
  SwapyColSubtract,
  SwapyContainer,
  SwapyItem,
} from "../swapyGrid";

export default function SwapyGridDemo() {
  return (
    <SwapyContainer
      initialCols={2}
      className="gap-2 p-2 bg-black/50 rounded-lg border"
      layoutStyle="grid gap-2"
      initialSwapyData={[
        {
          id: "hi",
          col: 1,
          row: 1,
          node: <SwapyItem>Hi</SwapyItem>,
        },
        {
          id: "bi",
          col: 1,
          row: 1,
          node: <SwapyItem>Bi</SwapyItem>,
        },
      ]}
    >
      <div className="flex gap-2 items-center">
        <SwapyColSubtract variant={"outline"} size={"icon-xs"}>
          <LucideMinus />
        </SwapyColSubtract>
        <SwapyColDisplay className="text-xs p-2 pt-1 pb-1 bg-muted rounded-md font-mono" />
        <SwapyColAdd variant={"outline"} size={"icon-xs"}>
          <LucidePlus />
        </SwapyColAdd>
      </div>
    </SwapyContainer>
  );
}
