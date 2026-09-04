import { ComponentProps } from "react";
import { Button } from "../ui/button";

type Props = ComponentProps<typeof Button> & { loading?: boolean };

export default function LoadingButton({
  children,
  loading,
  disabled,
  ...props
}: Props) {
  return (
    <Button {...props} disabled={loading || disabled}>
      {loading ? <p>Loading...</p> : children}
    </Button>
  );
}
