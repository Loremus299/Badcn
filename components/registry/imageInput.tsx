/* eslint-disable @next/next/no-img-element */
import { ComponentProps, useRef, useState } from "react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";

type Props = Omit<Omit<ComponentProps<typeof Input>, "accept">, "className"> & {
  accepts?: string[];
  className?: string;
};

export default function ImageInput({
  accepts = ["image/png", "image/jpeg", "image/gif", "image/webp"],
  className,
  onChange = () => null,
  ...props
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);

  return (
    <div className="grid gap-2 ">
      <div
        className={cn(
          "text-sm p-3 rounded-md border cursor-crosshair",
          className,
        )}
        tabIndex={0}
        onPaste={(e) => {
          const input = inputRef.current!;
          e.preventDefault();

          const item = Array.from(e.clipboardData.items).find(
            (item) => item.kind === "file" && accepts.includes(item.type),
          );

          const file = item?.getAsFile();
          if (!file) return;

          const dataTransfer = new DataTransfer();
          files.forEach((file) => dataTransfer.items.add(file));
          dataTransfer.items.add(file);

          input.files = dataTransfer.files;

          input.dispatchEvent(new Event("change", { bubbles: true }));
        }}

        onDrop={(e) => {
          const input = inputRef.current!;
          e.preventDefault();

          const item = Array.from(e.dataTransfer.items).find(
            (item) => item.kind === "file" && accepts.includes(item.type),
          );

          const file = item?.getAsFile();
          if (!file) return;

          const dataTransfer = new DataTransfer();
          files.forEach((file) => dataTransfer.items.add(file));
          dataTransfer.items.add(file);

          input.files = dataTransfer.files;

          input.dispatchEvent(new Event("change", { bubbles: true }));
        }}

        onDragOver={(e) => {
          e.preventDefault();
        }}
      >
        <button
          className="underline cursor-pointer"
          onClick={() => inputRef.current!.click()}
        >
          Choose an image
        </button>{" "}
        <span>or drag, paste here.</span>
        <Input
          ref={inputRef}
          type="file"
          accept={accepts.join(",")}
          className="hidden"
          onChange={(e) => {
            const filesArr = Array.from(e.target.files ?? []);
            const final: File[] = [...filesArr, ...files];
            setFiles(final);

            onChange(e);
          }}
          {...props}
        />
      </div>
      <Carousel className="w-fit">
        <CarouselContent>
          {files.map((item, index) => (
            <CarouselItem key={index}>
              <img
                alt={item.name}
                src={URL.createObjectURL(item)}
                className="rounded-md border"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
