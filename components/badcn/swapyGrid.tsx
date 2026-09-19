import { cn } from "@/lib/utils";
import { ComponentProps, useEffect, useRef } from "react";
import {
  createSwapy,
  type Swapy,
  type SwapEndEvent,
  type SwapEvent,
  type SwapStartEvent,
} from "swapy";

type Props = ComponentProps<"div"> & {
  onSwap?: (arg: SwapEvent) => void;
  onSwapStart?: (arg: SwapStartEvent) => void;
  onSwapEnd?: (arg: SwapEndEvent) => void;
};

export default function SwapyGrid({
  onSwap = () => {},
  onSwapStart = () => {},
  onSwapEnd = () => {},
  className,
  ...props
}: Props) {
  const swapy = useRef<Swapy>(null);
  const container = useRef<HTMLDivElement>(null);

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
    <div
      {...props}
      className={cn("grid gap-4", className)}
      style={{}}
      ref={container}
    ></div>
  );
}
