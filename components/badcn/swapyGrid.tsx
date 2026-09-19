import { cn } from "@/lib/utils";
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

export interface SwapyNode {
  id: string;
  col: number;
  row: number;
  node: ReactNode;
}

type Props = ComponentProps<"div"> & {
  initialSwapyData?: Array<SwapyNode>;
  initialsCols?: number;
  initialEdit?: boolean;
  onSwap?: (arg: SwapEvent) => void;
  onSwapStart?: (arg: SwapStartEvent) => void;
  onSwapEnd?: (arg: SwapEndEvent) => void;
  defaultComponent?: ReactNode;
  layoutStyle?: string;
};

const SwapyContext = createContext<{
  swapyData: Array<SwapyNode>;
  setSwapyData: Dispatch<SetStateAction<SwapyNode[]>>;
  cols: number;
  setCols: Dispatch<SetStateAction<number>>;
  edit: boolean;
  setEdit: Dispatch<SetStateAction<boolean>>;
} | null>(null);

export default function SwapyGrid({
  initialSwapyData = [],
  initialsCols = 2,
  initialEdit = true,
  onSwap = () => {},
  onSwapStart = () => {},
  onSwapEnd = () => {},
  defaultComponent,
  layoutStyle,
  className,
  children,

  ...props
}: Props) {
  const swapy = useRef<Swapy>(null);
  const container = useRef<HTMLDivElement>(null);
  const [swapyData, setSwapyData] = useState(initialSwapyData);
  const [cols, setCols] = useState(initialsCols);
  const [edit, setEdit] = useState(initialEdit);

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

    swapy.current.enable(edit);

    return () => {
      swapy.current?.destroy();
      swapy.current = null;
    };
  }, [edit, onSwap, onSwapEnd, onSwapStart]);

  return (
    <SwapyContext.Provider
      value={{ swapyData, setSwapyData, cols, setCols, edit, setEdit }}
    >
      <div className={layoutStyle}>
        {children}
        <div
          {...props}
          className={cn("grid gap-4", className)}
          style={{
            gridTemplateColumns: `repeat(${cols}, ${100 / cols}%)`,
          }}
          ref={container}
        >
          {swapyData.map((item) => (
            <SwapyItem
              key={item.id}
              id={item.id}
              col={item.col}
              row={item.row}
              node={item.node}
            />
          ))}
          <Button
            onClick={() => {
              setSwapyData([
                ...swapyData,
                {
                  id: globalThis.crypto.randomUUID(),
                  col: 1,
                  row: 1,
                  node: defaultComponent,
                },
              ]);
            }}
          >
            +
          </Button>
        </div>
      </div>
    </SwapyContext.Provider>
  );
}

export function SwapyItem(item: SwapyNode) {
  return (
    <div key={item.id} data-swapy-slot={`slot-${item.id}`}>
      <div
        data-swapy-item={`item-${item.id}`}
        style={{
          gridRow: `span ${item.row} / span ${item.row}`,
          gridColumn: `span ${item.col} / span ${item.col}`,
        }}
      >
        {item.node}
      </div>
    </div>
  );
}

export function SwapyEdit() {
  const ctx = useContext(SwapyContext);

  return (
    <Button onClick={() => ctx?.setEdit(!ctx.edit)}>
      {ctx?.edit ? "Lock" : "Edit"}
    </Button>
  );
}
