/* eslint-disable @next/next/no-img-element */
import Command from "@/components/command";
import ComponentShowcaseOnly from "@/components/compShowOnly";
import DemoRenderer from "@/components/demoRenderer";
import data from "@/registry.json";
import { readFileSync } from "fs";
import Code from "./_components/code";
import Link from "next/link";

export async function generateStaticParams() {
  return data.items.map((item) => ({
    component: item.name,
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ component: string }>;
}) {
  const { component } = await params;
  const details = data.items.filter((t) => t.name === component)[0];

  return (
    <div>
      <div className="flex justify-center scale-95">
        <main className="w-full max-w-xl grid gap-6 landscape:pt-8">
          <div>
            <h1 className="text-lg font-semibold tracking-tight">
              {details.name
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
              .
            </h1>
            <h2 className="text-muted-foreground text-sm">
              {details.description}
            </h2>
          </div>
          <div>
            <ComponentShowcaseOnly>
              <DemoRenderer path={details.files[0].demo} />
            </ComponentShowcaseOnly>
          </div>
          <div className="grid gap-3">
            <h5 className="tracking-tight font-semibold">Installation.</h5>
            <Command name={details.name} />
          </div>
          <div className="grid gap-3">
            <h5 className="tracking-tight font-semibold">Usage.</h5>
            <Code>{readFileSync(details.files[0].demo, "utf-8")}</Code>
          </div>
          <div className="grid gap-3">
            <h5 className="tracking-tight font-semibold">Source code.</h5>
            <Code>{readFileSync(details.files[0].path, "utf-8")}</Code>
          </div>
          <div className="grid gap-3">
            <h5 className="tracking-tight font-semibold">Dependencies.</h5>
            <div className="bg-card border p-2 rounded-md text-sm">
              {details.registryDependencies.map((item) => (
                <div key={item} className="pl-1">
                  -{" "}
                  {item
                    .split("-")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-3">
            <h5 className="tracking-tight font-semibold">Author.</h5>
            <Link
              target="_blank"
              href={details.authorContact}
              className="flex gap-2 items-center text-sm bg-card p-2 rounded-md border"
            >
              <img
                src={details.authorImage}
                alt={`${details.author} profile picture`}
                className="w-6 rounded-full"
              />
              {details.author}
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
