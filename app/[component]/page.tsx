import data from "@/registry.json";

export default async function Page({
  params,
}: {
  params: Promise<{ component: string }>;
}) {
  const { component } = await params;

  const details = data.items.filter((t) => t.name === component)[0];
  return <main>{details.name}</main>;
}
