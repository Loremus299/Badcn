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
      if (event.hasChanged) {
        const slotMap = event.slotItemMap.asArray;

        setSwapyData((prev) => {
          const prevMap = new Map(prev.map((item) => [item.id, item]));
          const slotDimensions = prev.map((item) => ({
            col: item.col,
            row: item.row,
          }));

          const nextData: SwapyNode[] = [];

          slotMap.forEach((entry: { item: string }, index: number) => {
            const itemId = entry.item.replace("item-", "");
            const item = prevMap.get(itemId);

            if (item) {
              nextData.push({
                ...item,
                col: slotDimensions[index].col,
                row: slotDimensions[index].row,
              });
            }
          });

          return nextData.length === prev.length ? nextData : prev;
        });
      }
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
        <div className="flex items-center gap-2">
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
          {edit && (
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
          )}
        </div>
      </div>
    </SwapyContext.Provider>
  );
}

type ButtonProps = ComponentProps<typeof Button>;
type DivProps = ComponentProps<"div">;

function SwapyDisplay(props: DivProps) {
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

function SwapyAdd(props: ButtonProps) {
  const ctx = useContext(SwapyContext);
  return (
    <Button {...props} onClick={() => ctx?.setCols(ctx.cols + 1)}>
      +
    </Button>
  );
}

function SwapySub(props: ButtonProps) {
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
  const ctx = useContext(SwapyContext);
  const [showEdit, setShowEdit] = useState(false);

  return (
    <div
      key={item.id}
      data-swapy-slot={`slot-${item.id}`}
      className="h-full w-full"
      onMouseEnter={() => setShowEdit(true)}
      onMouseLeave={() => setShowEdit(false)}
      style={{
        gridRow: `span ${item.row} / span ${item.row}`,
        gridColumn: `span ${item.col} / span ${item.col}`,
      }}
    >
      <div className="h-full w-full" data-swapy-item={`item-${item.id}`}>
        {ctx?.edit && showEdit && (
          <>
            <div className="relative">
              <div className="absolute bg-muted rounded-tl-md -mt-2 -ml-2">
                <SwapyItemDel
                  id={item.id}
                  className={"rounded-none text-xs"}
                  variant={"ghost"}
                  size={"icon-xs"}
                />
              </div>
            </div>
            <div className="relative">
              <div className="absolute bg-muted rounded-r-md -mt-2 ml-3 pl-3 flex items-center gap-4">
                <SwapyItemSubCol
                  id={item.id}
                  className={"rounded-none w-1"}
                  variant={"ghost"}
                  size={"icon-xs"}
                />
                <SwapyColDisplay id={item.id} className="text-xs" />
                <SwapyItemAddCol
                  id={item.id}
                  className={"rounded-none w-1 mr-2"}
                  variant={"ghost"}
                  size={"icon-xs"}
                />
              </div>
            </div>
            <div className="relative">
              <div className="absolute bg-muted rounded-b-md mt-4 -ml-2 grid place-items-center">
                <SwapyItemSubRow
                  id={item.id}
                  className={"rounded-none"}
                  variant={"ghost"}
                  size={"icon-xs"}
                />
                <SwapyRowDisplay id={item.id} className="text-xs pt-2" />
                <SwapyItemAddRow
                  id={item.id}
                  className={"rounded-none"}
                  variant={"ghost"}
                  size={"icon-xs"}
                />
              </div>
            </div>
          </>
        )}
        {item.node}
      </div>
    </div>
  );
}

function SwapyItemAddCol(props: ButtonProps & { id: string }) {
  const ctx = useContext(SwapyContext);
  const cur = ctx?.swapyData.find((x) => x.id === props.id);
  if (!cur) return;

  if (cur.col === ctx?.cols) return;

  return (
    <Button
      {...props}
      onClick={() => {
        ctx?.setSwapyData(
          ctx.swapyData.map((item) =>
            item.id === cur.id ? { ...item, col: item.col + 1 } : item,
          ),
        );
      }}
    >
      +
    </Button>
  );
}

function SwapyItemSubCol(props: ButtonProps & { id: string }) {
  const ctx = useContext(SwapyContext);
  const cur = ctx?.swapyData.find((x) => x.id === props.id);
  if (!cur) return;

  if (cur.col === 1) return;

  return (
    <Button
      {...props}
      onClick={() => {
        ctx?.setSwapyData(
          ctx.swapyData.map((item) =>
            item.id === cur.id ? { ...item, col: item.col - 1 } : item,
          ),
        );
      }}
    >
      -
    </Button>
  );
}

function SwapyItemAddRow(props: ButtonProps & { id: string }) {
  const ctx = useContext(SwapyContext);
  const cur = ctx?.swapyData.find((x) => x.id === props.id);
  if (!cur) return;

  return (
    <Button
      {...props}
      onClick={() => {
        ctx?.setSwapyData(
          ctx.swapyData.map((item) =>
            item.id === cur.id ? { ...item, row: item.row + 1 } : item,
          ),
        );
      }}
    >
      +
    </Button>
  );
}

function SwapyItemSubRow(props: ButtonProps & { id: string }) {
  const ctx = useContext(SwapyContext);
  const cur = ctx?.swapyData.find((x) => x.id === props.id);
  if (!cur) return;

  if (cur.row === 1) return;

  return (
    <Button
      {...props}
      onClick={() => {
        ctx?.setSwapyData(
          ctx.swapyData.map((item) =>
            item.id === cur.id ? { ...item, row: item.row - 1 } : item,
          ),
        );
      }}
    >
      -
    </Button>
  );
}

function SwapyItemDel(props: ButtonProps & { id: string }) {
  const ctx = useContext(SwapyContext);

  return (
    <Button
      {...props}
      onClick={() => {
        ctx?.setSwapyData(ctx.swapyData.filter((item) => item.id !== props.id));
      }}
    >
      🗑️
    </Button>
  );
}

function SwapyColDisplay(props: DivProps & { id: string }) {
  const ctx = useContext(SwapyContext);
  const cur = ctx?.swapyData.find((x) => x.id === props.id);
  if (!cur) return;

  return <div {...props}>{cur.col}</div>;
}

function SwapyRowDisplay(props: DivProps & { id: string }) {
  const ctx = useContext(SwapyContext);
  const cur = ctx?.swapyData.find((x) => x.id === props.id);
  if (!cur) return;

  return <div {...props}>{cur.row}</div>;
}
