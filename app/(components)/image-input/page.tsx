import Command from "@/components/command";
import Show from "./show";

export default function Page() {
  return (
    <div className="grid place-items-center p-8">
      <div className="w-full max-w-xl grid gap-4">
        <div>
          <h1 className="text-md tracking-tight font-semibold">Image Input.</h1>
          <h3 className="text-sm text-muted-foreground">
            Image input with support for pasting, drag & drop, preview.
          </h3>
        </div>
        <Show />

        <Command name="image-input" />
      </div>
    </div>
  );
}
