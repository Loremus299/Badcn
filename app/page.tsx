import ToolTipButton from "@/components/registry/ToolTipButton";
import { ChevronRightCircleIcon } from "lucide-react";

export default function Page() {
  return (
    <div className="grid place-items-center min-h-screen w-full">
      <ToolTipButton
        tip={
          <div>
            <p>Review the code of this PR.</p>
            <p className="text-muted">submitted by: Loremus</p>
          </div>
        }
      >
        <ChevronRightCircleIcon /> Review
      </ToolTipButton>
    </div>
  );
}
