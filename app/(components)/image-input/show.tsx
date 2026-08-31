"use client";

import ComponentShowcaseOnly from "@/components/compShowOnly";
import ImageInput from "@/components/badcn/imageInput";
import { useState } from "react";

export default function Show() {
  const [data, setData] = useState<File[]>([]);
  return (
    <>
      <ComponentShowcaseOnly>
        <div className="max-w-sm w-full p-4">
          <ImageInput
            multiple
            onChange={(e) => setData(Array.from(e.currentTarget.files!))}
          />
        </div>
      </ComponentShowcaseOnly>
      {data.map((file, index) => (
        <div key={index}>{file.name}</div>
      ))}
    </>
  );
}
