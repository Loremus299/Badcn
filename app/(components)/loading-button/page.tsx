import Command from "@/components/command";
import Show from "./show";

export default function Page() {
  return (
    <div className="grid place-items-center p-8">
      <div className="w-full max-w-xl grid gap-4">
        <div>
          <h1 className="text-md tracking-tight font-semibold">
            Loading Button.
          </h1>
          <h3 className="text-sm text-muted-foreground">
            A button with support for loading state.
          </h3>
        </div>
        <Show />

        <Command name="loading-button" />
      </div>
    </div>
  );
}
