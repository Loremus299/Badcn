import { SwapyContainer, SwapyItem, SwapySlot } from "../swapyGrid";

export default function SwapyGridDemo() {
  return (
    <SwapyContainer rows={2} cols={2} className="gap-2">
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
      <SwapySlot id="tri" cols={2}>
        <SwapyItem
          id="tri"
          className="p-4 pt-2 pb-2 grid bg-muted rounded-md border"
        >
          Tri
        </SwapyItem>
      </SwapySlot>
    </SwapyContainer>
  );
}
