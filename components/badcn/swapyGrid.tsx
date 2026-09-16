import { cn } from "cn";
import {
  Children,
  ComponentProps,
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  createSwapy,
  type Swapy,
  type SwapEvent,
  type SwapStartEvent,
  type SwapEndEvent,
} from "swapy";
import { Button } from "../ui/button";

type SwapyItemRepresentation = {
  id: string;
  row: number;
  col: number;
  node: ReactNode;
};

type SwapyContainerProps = ComponentProps<"div"> & {
  initialCols?: number;
  layoutStyle?: string;
  initialEdit?: boolean;
  initialSwapyData?: Array<SwapyItemRepresentation>;
  onSwap?: (arg: SwapEvent) => void;
  onSwapStart?: (arg: SwapStartEvent) => void;
  onSwapEnd?: (arg: SwapEndEvent) => void;
  onLayoutChange?: (arg: SwapyItemRepresentation[]) => void;
};

const ContainerContext = createContext<{
  cols: number;
  setCols: Dispatch<SetStateAction<number>>;
  editing: boolean;
  setEditing: Dispatch<SetStateAction<boolean>>;
  setSwapyData: Dispatch<SetStateAction<Array<SwapyItemRepresentation>>>;
} | null>(null);

export function SwapyContainer({
  initialCols = 2,
  initialEdit = true,
  initialSwapyData = [],
  className,
  layoutStyle,
  children,
  onSwap = () => {},
  onSwapStart = () => {},
  onSwapEnd = () => {},
  onLayoutChange = () => {},
  ...props
}: SwapyContainerProps) {
  const swapy = useRef<Swapy>(null);
  const container = useRef(null);
  const [cols, setCols] = useState(initialCols);
  const [editing, setEditing] = useState(initialEdit);
  const [swapyData, setSwapyData] =
    useState<SwapyItemRepresentation[]>(initialSwapyData);
  const childrenArr = Children.toArray(children);

  useEffect(() => {
    onLayoutChange(swapyData);
  }, [onLayoutChange, swapyData]);

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

    swapy.current?.enable(editing);

    return () => {
      swapy.current?.destroy();
    };
  }, [editing, onSwap, onSwapEnd, onSwapStart]);

  return (
    <ContainerContext.Provider
      value={{ cols, setCols, editing, setEditing, setSwapyData }}
    >
      <div {...props} ref={container} className={layoutStyle}>
        {childrenArr[0]}
        <div
          className={cn("grid", className)}
          style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
        >
          {childrenArr[1]}
        </div>
      </div>
    </ContainerContext.Provider>
  );
}

type SwapySlot = ComponentProps<"div"> & {
  cols?: number;
  rows?: number;
};

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
  id = globalThis.crypto.randomUUID(),
  ...props
}: SwapySlot) {
  const [col, setCol] = useState(cols);
  const [row, setRow] = useState(rows);
  const { setSwapyData } = useContext(ContainerContext)!;

  useEffect(() => {
    setSwapyData((prev) => {
      const existing = prev.find((i) => i.id === id);

      if (!existing) {
        return [...prev, { id, col, row, node: children }];
      }

      return prev.map((i) =>
        i.id === id ? { ...i, col, row, node: children } : i,
      );
    });
  }, [children, col, id, row, setSwapyData]);

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

type SwapyItem = ComponentProps<"div">;

export function SwapyItem({ children, className, id, ...props }: SwapySlot) {
  return (
    <div {...props} className={className} data-swapy-item={`item-${id}`}>
      <div>{children}</div>
    </div>
  );
}

type Button = ComponentProps<typeof Button>;
type Display = ComponentProps<"div">;

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

export function SwapyColDisplay(props: Display) {
  const ctx = useContext(ContainerContext);
  return <div {...props}>{ctx?.cols}</div>;
}
