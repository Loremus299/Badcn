import { cn } from "cn";
import {
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
  type SwapEndEvent,
  type SwapEvent,
  type SwapStartEvent,
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
  initialSwapyData?: SwapyItemRepresentation[];
  AddButton?: ReactNode;
  onSwap?: (arg: SwapEvent) => void;
  onSwapStart?: (arg: SwapStartEvent) => void;
  onSwapEnd?: (arg: SwapEndEvent) => void;
  onLayoutChange?: (arg: SwapyItemRepresentation[]) => void;
};

type ContainerContextValue = {
  cols: number;
  setCols: Dispatch<SetStateAction<number>>;
  editing: boolean;
  setEditing: Dispatch<SetStateAction<boolean>>;
  setSwapyData: Dispatch<SetStateAction<SwapyItemRepresentation[]>>;
  setItemSize: (id: string, col: number, row: number) => void;
};

const ContainerContext = createContext<ContainerContextValue | null>(null);

export function SwapyContainer({
  initialCols = 2,
  initialEdit = true,
  initialSwapyData = [],
  className,
  layoutStyle,
  AddButton = (
    <SwapySlotAdd col={1} row={1} component={<SwapyItem>Default</SwapyItem>}>
      +
    </SwapySlotAdd>
  ),
  children,

  onSwap = () => {},
  onSwapStart = () => {},
  onSwapEnd = () => {},
  onLayoutChange = () => {},
  ...props
}: SwapyContainerProps) {
  const swapy = useRef<Swapy>(null);
  const container = useRef<HTMLDivElement>(null);

  const [cols, setCols] = useState(initialCols);
  const [editing, setEditing] = useState(initialEdit);
  const [swapyData, setSwapyData] =
    useState<SwapyItemRepresentation[]>(initialSwapyData);

  const setItemSize = (id: string, col: number, row: number) => {
    setSwapyData((prev) =>
      prev.map((item) => (item.id === id ? { ...item, col, row } : item)),
    );
  };

  useEffect(() => {
    onLayoutChange(swapyData);
  }, [onLayoutChange, swapyData]);

  useEffect(() => {
    if (!container.current) return;
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

    return () => {
      swapy.current?.destroy();
      swapy.current = null;
    };
  }, [onSwap, onSwapEnd, onSwapStart]);

  useEffect(() => {
    swapy.current?.enable(editing);
  }, [editing]);

  useEffect(() => {
    swapy.current?.update();
  }, [swapyData]);

  return (
    <ContainerContext.Provider
      value={{
        cols,
        setCols,
        editing,
        setEditing,
        setSwapyData,
        setItemSize,
      }}
    >
      <div {...props} ref={container} className={layoutStyle}>
        {children}
        <div
          className={cn("grid", className)}
          style={{
            gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
          }}
        >
          {swapyData.map((item) => (
            <SwapySlot
              key={item.id}
              id={item.id}
              cols={item.col}
              rows={item.row}
            >
              {item.node}
            </SwapySlot>
          ))}
          <SwapySlot id="add-slot-button">
            <SwapyItem>{AddButton}</SwapyItem>
          </SwapySlot>
        </div>
      </div>
    </ContainerContext.Provider>
  );
}

type SwapySlotProps = ComponentProps<"div"> & {
  cols?: number;
  rows?: number;
  onSizeChange?: (size: { cols: number; rows: number }) => void;
};

type SlotContextValue = {
  id: string;
  col: number;
  row: number;
  setCol: (col: number) => void;
  setRow: (row: number) => void;
};

const SlotContext = createContext<SlotContextValue | null>(null);

export function SwapySlot({
  cols = 1,
  rows = 1,
  id = globalThis.crypto.randomUUID(),
  children,
  className,
  onSizeChange = () => {},
  ...props
}: SwapySlotProps) {
  const { setItemSize } = useContext(ContainerContext)!;

  useEffect(() => {
    onSizeChange({ cols, rows });
  }, [cols, onSizeChange, rows]);

  return (
    <SlotContext.Provider
      value={{
        id,
        col: cols,
        row: rows,
        setCol: (value) => setItemSize(id, value, rows),
        setRow: (value) => setItemSize(id, cols, value),
      }}
    >
      <div
        {...props}
        className={className}
        style={{
          gridColumn: `span ${cols} / span ${cols}`,
          gridRow: `span ${rows} / span ${rows}`,
        }}
        data-swapy-slot={`slot-${id}`}
      >
        {children}
      </div>
    </SlotContext.Provider>
  );
}

type SwapyItemProps = ComponentProps<"div">;

export function SwapyItem({ children, className, ...props }: SwapyItemProps) {
  const ctx = useContext(SlotContext);

  return (
    <div {...props} className={className} data-swapy-item={`item-${ctx?.id}`}>
      <div>{children}</div>
    </div>
  );
}

type ButtonProps = ComponentProps<typeof Button>;
type DisplayProps = ComponentProps<"div">;

export function SwapyColAdd({ children, ...props }: ButtonProps) {
  const ctx = useContext(ContainerContext);

  return (
    <Button {...props} onClick={() => ctx?.setCols((value) => value + 1)}>
      {children}
    </Button>
  );
}

export function SwapyColSubtract({
  children,
  className,
  ...props
}: ButtonProps) {
  const ctx = useContext(ContainerContext);

  return (
    <Button
      {...props}
      className={cn(ctx?.cols === 1 ? "hidden" : className)}
      onClick={() => ctx?.setCols((value) => value - 1)}
    >
      {children}
    </Button>
  );
}

export function SwapyColDisplay(props: DisplayProps) {
  const ctx = useContext(ContainerContext);

  return <div {...props}>{ctx?.cols}</div>;
}

export function SwapySlotColAdd({
  children,
  className,
  ...props
}: ButtonProps) {
  const ctx = useContext(SlotContext);

  return (
    <Button
      {...props}
      className={className}
      onClick={() => ctx?.setCol(ctx.col + 1)}
    >
      {children}
    </Button>
  );
}

export function SwapySlotColSubtract({
  children,
  className,
  ...props
}: ButtonProps) {
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

export function SwapySlotColDisplay(props: DisplayProps) {
  const ctx = useContext(SlotContext);

  return <div {...props}>{ctx?.col}</div>;
}

export function SwapySlotRowAdd({
  children,
  className,
  ...props
}: ButtonProps) {
  const ctx = useContext(SlotContext);

  return (
    <Button
      {...props}
      className={className}
      onClick={() => ctx?.setRow(ctx.row + 1)}
    >
      {children}
    </Button>
  );
}

export function SwapySlotRowSubtract({
  children,
  className,
  ...props
}: ButtonProps) {
  const ctx = useContext(SlotContext);

  return (
    <Button
      {...props}
      className={cn(ctx?.row === 1 ? "hidden" : className)}
      onClick={() => ctx?.setRow(ctx.row - 1)}
    >
      {children}
    </Button>
  );
}

export function SwapySlotRowDisplay(props: DisplayProps) {
  const ctx = useContext(SlotContext);

  return <div {...props}>{ctx?.row}</div>;
}

type SwapySlotAddProps = ButtonProps & {
  component: ReactNode;
  col: number;
  row: number;
};

export function SwapySlotAdd({
  children,
  col,
  row,
  component,
  ...props
}: SwapySlotAddProps) {
  const ctx = useContext(ContainerContext);

  return (
    <Button
      {...props}
      onClick={() => {
        ctx?.setSwapyData((prev) => [
          ...prev,
          {
            id: globalThis.crypto.randomUUID(),
            col,
            row,
            node: component,
          },
        ]);
      }}
    >
      {children}
    </Button>
  );
}
