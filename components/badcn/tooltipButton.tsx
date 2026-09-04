import { ComponentProps } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import LoadingButton from "./loadingButton";

type Props = ComponentProps<typeof LoadingButton> & {
  tip?: React.ReactNode;
  tipProps?: ComponentProps<typeof TooltipContent>;
};

export default function TooltipButton({
  tip,
  tipProps,
  children,
  ...props
}: Props) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <LoadingButton {...props} data-slot="tooltip-trigger">
            {children}
          </LoadingButton>
        }
      ></TooltipTrigger>
      <TooltipContent {...tipProps}>{tip}</TooltipContent>
    </Tooltip>
  );
}
