import { LucideMinus, LucidePlus } from "lucide-react";
import {
  SwapyColAdd,
  SwapyColDisplay,
  SwapyColSubtract,
  SwapyContainer,
  SwapyItem,
  SwapySlot,
} from "../swapyGrid";

export default function SwapyGridDemo() {
  return (
    <SwapyContainer
      initialCols={2}
      className="gap-2 p-2 bg-black/50 rounded-lg border"
      layoutStyle="grid gap-2"
    >
      <div>
        <div className="flex gap-2 items-center">
          <SwapyColSubtract variant={"outline"} size={"icon-xs"}>
            <LucideMinus />
          </SwapyColSubtract>
          <SwapyColDisplay className="text-xs p-2 pt-1 pb-1 bg-muted rounded-md font-mono" />
          <SwapyColAdd variant={"outline"} size={"icon-xs"}>
            <LucidePlus />
          </SwapyColAdd>
        </div>
      </div>
      <>
        <SwapySlot id="hi">
          <SwapyItem
            id="hi"
            className="p-4 pt-2 pb-2 grid bg-muted rounded-md border"
          >
            Hi
          </SwapyItem>
        </SwapySlot>
        <SwapySlot id="bi">
          <SwapyItem
            id="bi"
            className="p-4 pt-2 pb-2 grid bg-muted rounded-md border"
          >
            Bi
          </SwapyItem>
        </SwapySlot>
        <SwapySlot id="tri">
          <SwapyItem
            id="tri"
            className="p-4 pt-2 pb-2 grid bg-muted rounded-md border"
          >
            Tri
          </SwapyItem>
        </SwapySlot>
        <SwapySlot id="cri">
          <SwapyItem
            id="cri"
            className="p-4 pt-2 pb-2 grid bg-muted rounded-md border"
          >
            Cri
          </SwapyItem>
        </SwapySlot>
      </>
    </SwapyContainer>
  );
}
