import { createSwapy, type Swapy, type SwapEvent } from "swapy";
import { ComponentProps, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type Props = ComponentProps<"div">;

export function SwapyContainer({
  children,
  onSwap = () => {},
  ...props
}: Props & { onSwap?: (arg: SwapEvent) => void }) {
  const swapy = useRef<Swapy>(null);
  const container = useRef(null);

  useEffect(() => {
    if (container.current) {
      swapy.current = createSwapy(container.current);
      swapy.current.onSwap((event) => {
        onSwap(event);
      });
    }

    return () => {
      swapy.current?.destroy();
    };
  }, [onSwap]);

  return (
    <div {...props} ref={container}>
      {children}
    </div>
  );
}

export function SwapyItem({ className, slot, id, children, ...props }: Props) {
  return (
    <div data-swapy-slot={slot}>
      <div data-swapy-item={id}>
        <div
          className={cn(
            "p-4 pt-2 pb-2 bg-muted rounded-md border drop-shadow-xl/50",
            className,
          )}
          {...props}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export function SwapyRow({ className, slot, children, ...props }: Props) {
  return (
    <div data-swapy-slot={`row-${slot}`}>
      <div data-swapy-item={`row-${slot}`}>
        <div className={cn("flex", className)} {...props}>
          {children}
        </div>
      </div>
    </div>
  );
}

export function SwapyColumn({ className, slot, children, ...props }: Props) {
  return (
    <div data-swapy-slot={`col-${slot}`}>
      <div data-swapy-item={`col-${slot}`}>
        <div className={cn("grid", className)} {...props}>
          {children}
        </div>
      </div>
    </div>
  );
}
