import { ComponentProps } from "react";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export default function ToolTipButton({
  props,
  children,
  tip,
}: {
  props?: ComponentProps<typeof Button>;
  children?: React.ReactNode;
  tip?: React.ReactNode;
}) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={<Button {...props}>{children}</Button>}
      ></TooltipTrigger>
      <TooltipContent>{tip}</TooltipContent>
    </Tooltip>
  );
}
