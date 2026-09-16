import {
  createSwapy,
  type Swapy,
  type SwapEvent,
  type SwapStartEvent,
  type SwapEndEvent,
} from "swapy";
import {
  Children,
  ComponentProps,
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { LucideMinus, LucidePlus } from "lucide-react";

type Props = ComponentProps<"div"> & {
  cols?: number;
  onSwap?: (arg: SwapEvent) => void;
  onSwapStart?: (arg: SwapStartEvent) => void;
  onSwapEnd?: (arg: SwapEndEvent) => void;
  layoutStyle?: string;
};

type Button = ComponentProps<typeof Button>;

const ContainerContext = createContext<{
  cols: number;
  setCols: Dispatch<SetStateAction<number>>;
} | null>(null);

export function SwapyContainer({
  children,
  cols = 2,
  onSwap = () => {},
  onSwapStart = () => {},
  onSwapEnd = () => {},
  className,
  layoutStyle,
  ...props
}: Props) {
  const swapy = useRef<Swapy>(null);
  const container = useRef(null);
  const [col, setCol] = useState(cols);
  const childrenArr = Children.toArray(children);

  useEffect(() => {
    if (container.current) {
      swapy.current = createSwapy(container.current);
      swapy.current.onSwap((event) => {
        onSwap(event);
      });

      swapy.current.onSwapStart((event) => {
        onSwapStart(event);
      });

      swapy.current.onSwapEnd((event) => {
        onSwapEnd(event);
      });
    }

    return () => {
      swapy.current?.destroy();
    };
  }, [onSwap, onSwapEnd, onSwapStart]);

  return (
    <ContainerContext.Provider value={{ cols: col, setCols: setCol }}>
      <div {...props} ref={container} className={layoutStyle}>
        {childrenArr[0]}
        <div
          className={cn("grid", className)}
          style={{ gridTemplateColumns: `repeat(${col}, minmax(0, 1fr))` }}
        >
          {childrenArr[1]}
        </div>
      </div>
    </ContainerContext.Provider>
  );
}

export function SwapyColAdd({ children, ...props }: Button) {
  const ctx = useContext(ContainerContext);
  return (
    <Button {...props} onClick={() => ctx?.setCols(ctx.cols + 1)}>
      {children}
    </Button>
  );
}

export function SwapyColSubtract({ children, className, ...props }: Button) {
  const ctx = useContext(ContainerContext);
  return (
    <Button
      {...props}
      className={cn(ctx?.cols === 1 ? "hidden" : className)}
      onClick={() => ctx?.setCols(ctx.cols - 1)}
    >
      {children}
    </Button>
  );
}

type SwapyColDisplay = ComponentProps<"div">;

export function SwapyColDisplay(props: SwapyColDisplay) {
  const ctx = useContext(ContainerContext);
  return <div {...props}>{ctx?.cols}</div>;
}

type SwapySlot = ComponentProps<"div"> & { cols?: number; rows?: number };

const SlotContext = createContext<{
  col: number;
  row: number;
  setCol: Dispatch<SetStateAction<number>>;
  setRow: Dispatch<SetStateAction<number>>;
} | null>(null);

export function SwapySlot({
  children,
  cols = 1,
  rows = 1,
  className,
  id,
  ...props
}: SwapySlot) {
  const [col, setCol] = useState(cols);
  const [row, setRow] = useState(rows);

  return (
    <SlotContext.Provider value={{ col, row, setCol, setRow }}>
      <div
        {...props}
        className={className}
        style={{
          gridColumn: `span ${col} / span ${col}`,
          gridRow: `span ${row} / span ${row}`,
        }}
        data-swapy-slot={`slot-${id}`}
      >
        {children}
      </div>
    </SlotContext.Provider>
  );
}

function SwapySlotResizeAdd({ children, className, ...props }: Button) {
  const ctx = useContext(SlotContext);
  const cont = useContext(ContainerContext);

  return (
    <Button
      {...props}
      className={cn(cont?.cols === ctx?.col ? "hidden" : className)}
      onClick={() => ctx?.setCol(ctx.col + 1)}
    >
      {children}
    </Button>
  );
}
function SwapySlotResizeSubtract({ children, className, ...props }: Button) {
  const ctx = useContext(SlotContext);

  return (
    <Button
      {...props}
      className={cn(ctx?.col === 1 ? "hidden" : className)}
      onClick={() => ctx?.setCol(ctx.col - 1)}
    >
      {children}
    </Button>
  );
}

type SwapyItem = ComponentProps<"div">;

export function SwapyItem({ children, className, id, ...props }: SwapySlot) {
  return (
    <div {...props} className={className} data-swapy-item={`item-${id}`}>
      <div className="relative">
        <div className="absolute -top-4.5 -left-2 flex gap-1">
          <SwapySlotResizeAdd
            variant={"secondary"}
            size={"icon-xs"}
            className={"size-4 border border-black"}
          >
            <LucidePlus />
          </SwapySlotResizeAdd>
          <SwapySlotResizeSubtract
            variant={"secondary"}
            size={"icon-xs"}
            className={"size-4 border border-black"}
          >
            <LucideMinus />
          </SwapySlotResizeSubtract>
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}
