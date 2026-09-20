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
  className,
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
      <div className="grid gap-2">
        <div className="flex items-center justify-between">
          <SwapyEdit
            variant={"secondary"}
            size={"icon-xs"}
            className={"text-xs"}
          />
          {edit && (
            <div className="flex gap-1 items-center bg-background rounded-md">
              <SwapySub variant={"ghost"} size={"icon-xs"} />
              <SwapyDisplay className="text-xs" />
              <SwapyAdd variant={"ghost"} size={"icon-xs"} />
            </div>
          )}
        </div>
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

type ButtonProps = ComponentProps<typeof Button>;
type DivProps = ComponentProps<"div">;

export function SwapyDisplay(props: DivProps) {
  const ctx = useContext(SwapyContext);

  return <div {...props}>{ctx?.cols}</div>;
}

export function SwapyEdit(props: ButtonProps) {
  const ctx = useContext(SwapyContext);

  return (
    <Button {...props} onClick={() => ctx?.setEdit(!ctx.edit)}>
      {ctx?.edit ? "🔒" : "🔓"}
    </Button>
  );
}

export function SwapyAdd(props: ButtonProps) {
  const ctx = useContext(SwapyContext);
  return (
    <Button {...props} onClick={() => ctx?.setCols(ctx.cols + 1)}>
      +
    </Button>
  );
}

export function SwapySub(props: ButtonProps) {
  const ctx = useContext(SwapyContext);
  if (ctx?.cols == 1) {
    return "";
  }
  return (
    <Button {...props} onClick={() => ctx?.setCols(ctx.cols - 1)}>
      -
    </Button>
  );
}

function SwapyItem(item: SwapyNode) {
  return (
    <div
      key={item.id}
      data-swapy-slot={`slot-${item.id}`}
      className="h-full w-full"
      style={{
        gridRow: `span ${item.row}`,
        gridColumn: `span ${item.col}`,
      }}
    >
      <div className="h-full w-full" data-swapy-item={`item-${item.id}`}>
        {item.node}
      </div>
    </div>
  );
}
