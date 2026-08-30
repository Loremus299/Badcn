"use client";

import ComponentShowcaseOnly from "@/components/compShowOnly";
import ImageInput from "@/components/registry/imageInput";

export default function Show() {
  return (
    <ComponentShowcaseOnly>
      <div className="w-sm">
        <ImageInput
          multiple
          onChange={(e) => {
            Array.from(e.currentTarget.files!).forEach((file) =>
              console.log(file.name),
            );
          }}
        />
      </div>
    </ComponentShowcaseOnly>
  );
}
