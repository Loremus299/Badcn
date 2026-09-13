import { useEffect, useRef, useState } from "react";
import { HexAlphaColorPicker, HexColorPicker } from "react-colorful";
import { Button, buttonVariants } from "../ui/button";
import { PipetteIcon, PlusIcon } from "lucide-react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "../ui/context-menu";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import ImageInput from "./imageInput";

type Props = {
  defaultColorHex?: string;
  alpha?: boolean;
  preset?: string[];
  editablePresets?: boolean;
  defaultImage?: string;
  onPresetChange?: (preset: string[]) => void;
  onPick?: (final: string) => void;
};

export default function ColorPicker({
  defaultColorHex = "#000000",
  alpha = true,
  preset = ["#f49595", " 	#f9eb97", "#c6f9ac", "#a8d9f6", "#e2bbfd"],
  editablePresets = true,
  onPresetChange = () => {},
  onPick = () => {},
  ...props
}: Props) {
  const [color, setColor] = useState(defaultColorHex);
  const [colorPickerLocal, setColorPickerLocal] = useState(defaultColorHex);
  const [finalColor, setFinalColor] = useState(defaultColorHex);
  const [presets, setPresets] = useState(preset);
  const [image, setImage] = useState<string | undefined>(props.defaultImage);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    onPresetChange(presets);
  }, [onPresetChange, presets]);

  useEffect(() => {
    onPick(finalColor);
  }, [finalColor, onPick]);

  useEffect(() => {
    if (!image || !canvas.current) return;

    const img = new Image();

    img.src = image;

    img.onload = () => {
      const ctx = canvas.current?.getContext("2d");

      if (!ctx || !canvas.current) return;

      canvas.current.width = img.naturalWidth;
      canvas.current.height = img.naturalHeight;

      ctx.drawImage(img, 0, 0);
    };
  }, [image]);

  return (
    <div className="w-full p-4 bg-muted rounded-xl border flex flex-col gap-2">
      {alpha ? (
        <HexAlphaColorPicker
          color={color}
          onChange={setColorPickerLocal}
          onChangeEnd={() => setColor(colorPickerLocal)}
          className="color-picker w-full! h-full! aspect-video"
        />
      ) : (
        <HexColorPicker
          color={color}
          onChange={setColorPickerLocal}
          onChangeEnd={() => setColor(colorPickerLocal)}
          className="color-picker w-full! h-full! aspect-video"
        />
      )}
      <div className="grid grid-cols-2 items-center gap-2">
        <div
          className={
            "pl-2 pr-2 pt-1.5 pb-1.5 rounded-full border-2 border-foreground text-sm font-mono w-full flex justify-center"
          }
          style={{ backgroundColor: colorPickerLocal }}
        >
          {alpha ? color.padEnd(9, "f").slice(1) : color.slice(0, 7).slice(1)}
        </div>
        <Dialog>
          <DialogTrigger className={buttonVariants({ size: "lg" })}>
            <PipetteIcon className="size-3.5 stroke-2" /> From image.
          </DialogTrigger>
          <DialogContent>
            {!image && (
              <ImageInput
                showPreview={false}
                accepts={["image/png", "image/jpeg", "image/webp"]}
                onChange={(e) => {
                  const file = e.currentTarget.files?.[0];
                  if (file) {
                    setImage(URL.createObjectURL(file));
                  }
                }}
              />
            )}
            {image && (
              <canvas
                ref={canvas}
                className="w-full cursor-crosshair"
                onClick={(e) => {
                  const ctx = canvas.current?.getContext("2d");

                  if (!ctx || !canvas.current) return;

                  const rect = canvas.current.getBoundingClientRect();

                  const scaleX = canvas.current.width / rect.width;
                  const scaleY = canvas.current.height / rect.height;

                  const x = Math.floor((e.clientX - rect.left) * scaleX);
                  const y = Math.floor((e.clientY - rect.top) * scaleY);

                  const rgb = ctx.getImageData(x, y, 1, 1).data;
                  const hex = Array.from(rgb)
                    .map((item) => item.toString(16).padStart(2, "0"))
                    .join("");

                  setColor(hex);
                  setColorPickerLocal(hex);
                }}
              />
            )}
          </DialogContent>
        </Dialog>
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
      <Button onClick={() => setFinalColor(color)}>Finalize.</Button>
    </div>
  );
}
