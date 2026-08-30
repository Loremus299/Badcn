import { ComponentProps } from "react";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export default function ToolTipButton({
  props,
  children,
  tipProps,
  tip,
  isLoading = false,
}: {
  props?: ComponentProps<typeof Button>;
  children?: React.ReactNode;
  tipProps?: ComponentProps<typeof TooltipContent>;
  tip?: React.ReactNode;
  isLoading?: boolean;
}) {
  if (isLoading) {
  }
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button data-slot="tooltip-trigger" {...props} disabled={isLoading}>
            {isLoading ? <p>Loading...</p> : children}
          </Button>
        }
      />
      <TooltipContent {...tipProps}>{tip}</TooltipContent>
    </Tooltip>
  );
}
