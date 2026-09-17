import { toast } from "@/components/ui/toast";
import ColorPicker from "../colorPicker";

export default function ColorPickerDemo() {
  return (
    <div className="w-full max-w-md p-16 ">
      <ColorPicker
        onPick={(e) => {
          toast.add({ title: `Nice color ${e}` });
        }}
        onPresetChange={(e) => {
          toast.add({ title: `New color in preset ${e[e.length - 1]}` });
        }}
      />
    </div>
  );
}
