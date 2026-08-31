import { ComponentProps } from "react";
import { Button } from "../ui/button";

type Props = ComponentProps<typeof Button>;

export default function LoadingButton({
  children,
  disabled = false,
  ...props
}: Props) {
  return (
    <Button data-slot="tooltip-trigger" {...props} disabled={disabled}>
      {disabled ? <p>Loading...</p> : children}
    </Button>
  );
}
