import {
  createSwapy,
  type Swapy,
  type SwapEvent,
  type SwapStartEvent,
  type SwapEndEvent,
} from "swapy";
import { ComponentProps, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Props = ComponentProps<"div"> & {
  rows?: number;
  cols?: number;
  onSwap?: (arg: SwapEvent) => void;
  onSwapStart?: (arg: SwapStartEvent) => void;
  onSwapEnd?: (arg: SwapEndEvent) => void;
};

export function SwapyContainer({
  children,
  rows = 2,
  cols = 2,
  onSwap = () => {},
  onSwapStart = () => {},
  onSwapEnd = () => {},
  className,
  ...props
}: Props) {
  const swapy = useRef<Swapy>(null);
  const container = useRef(null);
  const [col, setCol] = useState(cols);
  const [row, setRow] = useState(rows);

  const [colString, rowString] = [`grid-cols-${col}`, `grid-rows-${row}`];

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
    <div
      className={cn("grid", className, colString, rowString)}
      {...props}
      ref={container}
    >
      {children}
    </div>
  );
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
  const [col, setCol] = useState(cols);
  const [row, setRow] = useState(rows);

  const [colString, rowString] = [`col-span-${col}`, `row-span-${row}`];

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
