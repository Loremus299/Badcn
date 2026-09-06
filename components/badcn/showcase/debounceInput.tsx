import { useState } from "react";
import DebounceInput from "../debounceInput";

export default function DebounceInputDemo() {
  const defaultValue = "default";
  const [insV, setInsV] = useState(defaultValue);
  const [debV, setDebV] = useState(defaultValue);

  return (
    <div className="grid gap-2 p-16">
      <DebounceInput
        placeholder="Input Value"
        defaultValue={defaultValue}
        onBounce={(v) => setDebV(v)}
        onChange={(e) => setInsV(e.target.value)}
      />
      <div className="flex justify-between text-xs text-muted-foreground gap-16">
        <p>
          {insV} <br />
          Instant
        </p>
        <p>
          {debV}
          <br />
          <p>Debounce</p>
        </p>
      </div>
    </div>
  );
}
