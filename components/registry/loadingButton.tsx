import { ComponentProps } from "react";
import { Button } from "../ui/button";

type Props = ComponentProps<typeof Button> & { loading?: boolean };

export default function LoadingButton({
  loading = false,
  children,
  ...props
}: Props) {
  return (
    <Button data-slot="tooltip-trigger" {...props} disabled={loading}>
      {loading ? <p>Loading...</p> : children}
    </Button>
  );
}
