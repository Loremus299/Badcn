/* eslint-disable react-hooks/set-state-in-effect */
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

type Props = ComponentProps<"div"> & {
  cols?: number;
  onSwap?: (arg: SwapEvent) => void;
  onSwapStart?: (arg: SwapStartEvent) => void;
  onSwapEnd?: (arg: SwapEndEvent) => void;
  layoutStyle?: string;
};

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
  const [colString, setColString] = useState(`grid-cols-${cols}`);
  const childrenArr = Children.toArray(children);

  useEffect(() => {
    setColString(`grid-cols-${col}`);
  }, [col]);

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
        <div className={cn("grid", className, colString)}>{childrenArr[1]}</div>
      </div>
    </ContainerContext.Provider>
  );
}

type SwapyColAdd = ComponentProps<typeof Button>;

export function SwapyColAdd({ children, ...props }: SwapyColAdd) {
  const ctx = useContext(ContainerContext);
  return (
    <Button {...props} onClick={() => ctx?.setCols(ctx.cols + 1)}>
      {children}
    </Button>
  );
}

type SwapyColSubtract = ComponentProps<typeof Button>;

export function SwapyColSubtract({
  children,
  className,
  ...props
}: SwapyColAdd) {
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

export function SwapySlot({
  children,
  cols = 1,
  rows = 1,
  className,
  id,
  ...props
}: SwapySlot) {
  const [colString, rowString] = [`col-span-${cols}`, `row-span-${rows}`];

  return (
    <div
      {...props}
      className={cn(className, colString, rowString)}
      data-swapy-slot={`slot-${id}`}
    >
      {children}
    </div>
  );
}

type SwapyItem = ComponentProps<"div">;

export function SwapyItem({ children, className, id, ...props }: SwapySlot) {
  return (
    <div {...props} className={className} data-swapy-item={`item-${id}`}>
      {children}
    </div>
  );
}
