/* eslint-disable @typescript-eslint/no-unused-vars */
import { cn } from "@/lib/utils";
import { ComponentProps, ReactNode, useEffect, useRef, useState } from "react";
import {
  createSwapy,
  type Swapy,
  type SwapEndEvent,
  type SwapEvent,
  type SwapStartEvent,
} from "swapy";

export interface SwapyNode {
  id: string;
  col: number;
  row: number;
  node: ReactNode;
}

type Props = ComponentProps<"div"> & {
  initialSwapyData?: Array<SwapyNode>;
  initialsCols?: number;
  onSwap?: (arg: SwapEvent) => void;
  onSwapStart?: (arg: SwapStartEvent) => void;
  onSwapEnd?: (arg: SwapEndEvent) => void;
};

export default function SwapyGrid({
  initialSwapyData = [],
  initialsCols = 2,
  onSwap = () => {},
  onSwapStart = () => {},
  onSwapEnd = () => {},
  className,
  children,
  ...props
}: Props) {
  const swapy = useRef<Swapy>(null);
  const container = useRef<HTMLDivElement>(null);
  const [cols, setCols] = useState(initialsCols);

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

  return (
    <div>
      {children}
      <div
        {...props}
        className={cn("grid gap-4", className)}
        style={{
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        }}
        ref={container}
      >
        {initialSwapyData.map((item) => (
          <div key={item.id} data-swapy-slot={`slot-${item.id}`}>
            <div data-swapy-item={`item-${item.id}`}>{item.node}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
