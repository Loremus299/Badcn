import { toast } from "@/components/ui/toast";
import { SwapyColumn, SwapyContainer, SwapyItem, SwapyRow } from "../swapyGrid";

export default function SwapyGridDemo() {
  return (
    <SwapyContainer
      className="p-4 bg-black/25 border-2 rounded-xl"
      onSwap={(e) => {
        toast.add({
          title: "Swap Event",
          description: `Dragged item ${e.draggingItem} from ${e.fromSlot} to ${e.toSlot}`,
        });
      }}
    >
      <SwapyColumn slot="1" className="gap-2">
        <SwapyRow slot="1" className="gap-2">
          <SwapyItem slot="a" id="a">
            a
          </SwapyItem>
          <SwapyItem slot="b" id="b">
            b
          </SwapyItem>
        </SwapyRow>
        <SwapyRow slot="2" className="gap-2">
          <SwapyItem slot="c" id="c">
            c
          </SwapyItem>
          <SwapyItem slot="d" id="d">
            d
          </SwapyItem>
        </SwapyRow>
      </SwapyColumn>
    </SwapyContainer>
  );
}
