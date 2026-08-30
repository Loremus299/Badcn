import { ComponentProps } from "react";
import { Button } from "../ui/button";
import { TooltipContent } from "../ui/tooltip";

type Props = ComponentProps<typeof Button> & {
  tip?: React.ReactNode;
  tipProps?: ComponentProps<typeof TooltipContent>;
};

export default function TooltipButton() {}
