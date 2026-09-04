/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Copy } from "lucide-react";
import { toast } from "./ui/toast";

const prefix = (option: "npm" | "pnpm" | "yarn" | "bun") => {
  switch (option) {
    case "npm":
      return "npx";
    case "pnpm":
      return "pnpm dlx";
    case "yarn":
      return "npx";
    case "bun":
      return "bunx --bun";
  }
};

export default function Command({ name }: { name: string }) {
  const [currentOption, setCurrentOption] = useState<
    "npm" | "pnpm" | "yarn" | "bun"
  >("npm");
  const url = useRef("");

  useEffect(() => {
    const lastOption = window.localStorage.getItem("option");

    if (lastOption) {
      setCurrentOption(lastOption as "npm" | "pnpm" | "yarn" | "bun");
    }
  }, []);

  useEffect(() => {
    const newrl = `${prefix(currentOption)} shadcn@latest add https://cn.loremus.gay/r/${name}.json`;
    url.current = newrl;
  }, [currentOption, name]);

  return (
    <div className="bg-card p-2 border rounded-md grid gap-2 overflow-x-scroll portrait:w-screen w-full max-w-xl">
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button
            variant={"outline"}
            size={"xs"}
            className={"rounded-sm"}
            onClick={() => {
              setCurrentOption("npm");
              window.localStorage.setItem("option", "npm");
            }}
          >
            npm
          </Button>
          <Button
            variant={"outline"}
            size={"xs"}
            className={"rounded-sm"}
            onClick={() => {
              setCurrentOption("pnpm");
              window.localStorage.setItem("option", "pnpm");
            }}
          >
            pnpm
          </Button>
          <Button
            variant={"outline"}
            size={"xs"}
            className={"rounded-sm"}
            onClick={() => {
              setCurrentOption("yarn");
              window.localStorage.setItem("option", "yarn");
            }}
          >
            yarn
          </Button>
          <Button
            variant={"outline"}
            size={"xs"}
            className={"rounded-sm"}
            onClick={() => {
              setCurrentOption("bun");
              window.localStorage.setItem("option", "bun");
            }}
          >
            bun
          </Button>
        </div>
        <Button
          variant={"outline"}
          size={"icon-xs"}
          className={"rounded-sm"}
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(url.current);
              toast.add({
                title: "I hope you enjoy the component. :3",
              });
            } catch {
              toast.add({ title: "Failed to copy data to clipboard" });
            }
          }}
        >
          <Copy />
        </Button>
      </div>
      <pre className="text-xs">
        {prefix(currentOption)} shadcn@latest add https://cn.loremus.gay/r/
        {name}
        .json
      </pre>
    </div>
  );
}
