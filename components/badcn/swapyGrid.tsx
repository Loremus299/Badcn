import { createSwapy, type Swapy, type SwapEvent } from "swapy";
import { ComponentProps, useEffect, useRef } from "react";

type Props = ComponentProps<"div"> & { onSwap?: (arg: SwapEvent) => void };

export function SwapyContainer({
  children,
  onSwap = () => {},
  ...props
}: Props) {
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
