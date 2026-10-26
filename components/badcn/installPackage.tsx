/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import { ComponentProps, useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Copy } from "lucide-react";
import { toast } from "../ui/toast";
import { cn } from "@/lib/utils";

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

type Props = ComponentProps<"div"> & { command: string; copyPrompt: string };

export default function InstallPackage({
	command,
	copyPrompt,
	className,
}: Props) {
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

	return (
		<div className={cn("bg-card p-2 border rounded-md grid gap-2", className)}>
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
								title: copyPrompt,
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
				{prefix(currentOption)} {command}
			</pre>
		</div>
	);
}
