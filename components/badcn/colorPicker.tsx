import { useEffect, useState } from "react";
import { HexAlphaColorPicker, HexColorPicker } from "react-colorful";
import { Button } from "../ui/button";
import { PipetteIcon, PlusIcon } from "lucide-react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "../ui/context-menu";

type Props = {
  defaultColorHex?: string;
  alpha?: boolean;
  preset?: string[];
  editablePresets?: boolean;
  onPresetChange?: (preset: string[]) => void;
  onPick?: () => void;
};

export default function ColorPicker({
  defaultColorHex = "#000000",
  alpha = true,
  preset = ["#f49595", " 	#f9eb97", "#c6f9ac", "#a8d9f6", "#e2bbfd"],
  editablePresets = true,
  onPresetChange = () => {},
}: Props) {
  const [color, setColor] = useState(defaultColorHex);
  const [presets, setPresets] = useState(preset);

  useEffect(() => {
    onPresetChange(presets);
  }, [onPresetChange, presets]);

  return (
    <div className="w-full p-4 bg-muted rounded-xl border flex flex-col gap-2">
      {alpha ? (
        <HexAlphaColorPicker
          color={color}
          onChange={setColor}
          className="color-picker w-full! h-full! aspect-video"
        />
      ) : (
        <HexColorPicker
          color={color}
          onChange={setColor}
          className="color-picker w-full! h-full! aspect-video"
        />
      )}
      <div className="flex items-center gap-2">
        <div
          className={
            "pl-2 pr-2 pt-1 pb-1 rounded-full border-2 border-foreground text-sm font-mono w-full flex justify-center"
          }
          style={{ backgroundColor: color }}
        >
          {alpha ? color.padEnd(9, "f").slice(1) : color.slice(0, 7).slice(1)}
        </div>
        <Button size={"icon-sm"}>
          <PipetteIcon className="size-3" />
        </Button>
      </div>
      <div className="flex gap-2 flex-wrap">
        {editablePresets
          ? presets.map((color, index) => (
              <ContextMenu key={index}>
                <ContextMenuTrigger
                  className="size-6 rounded-full border-2 border-white"
                  style={{ backgroundColor: color }}
                  onClick={() => setColor(color)}
                />
                <ContextMenuContent>
                  <ContextMenuItem
                    onClick={() =>
                      setPresets(presets.filter((t, i) => i !== index))
                    }
                  >
                    Remove color
                  </ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>
            ))
          : presets.map((color, index) => (
              <button
                key={index}
                className="size-6 rounded-full border-2 border-white"
                style={{ backgroundColor: color }}
                onClick={() => setColor(color)}
              />
            ))}
        {editablePresets && (
          <Button
            size={"icon-xs"}
            variant={"outline"}
            onClick={() => setPresets([...presets, color])}
          >
            <PlusIcon />
          </Button>
        )}
      </div>
    </div>
  );
}
