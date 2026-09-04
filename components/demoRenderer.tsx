/* eslint-disable react-hooks/static-components */
"use client";
import dynamic from "next/dynamic";

export default function DemoRenderer({ path }: { path: string }) {
  const cleanPath = path
    .replace(/^components\//, "")
    .replace(/\.(tsx|jsx|ts|js)$/, "");
  const DynamicComponent = dynamic(() => import(`@/components/${cleanPath}`), {
    loading: () => <p>Loading component preview...</p>,
    ssr: false,
  });

  return <DynamicComponent />;
}
