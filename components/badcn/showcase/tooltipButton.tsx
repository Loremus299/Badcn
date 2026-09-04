import TooltipButton from "../tooltipButton";

export default function TooltipButtonDemo() {
  return (
    <TooltipButton
      tip={
        <p>
          AND A TOOLTIP <span className="text-destructive">??!!!!</span>
        </p>
      }
    >
      A button
    </TooltipButton>
  );
}
