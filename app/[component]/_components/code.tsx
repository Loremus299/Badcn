import { codeToHtml } from "shiki";

export default async function Code({ children }: { children: string }) {
  const html = await codeToHtml(children, {
    lang: "jsx",
    theme: "slack-dark",
  });

  return (
    <div className="p-2 bg-[#222222] rounded-md border">
      <div
        className="text-sm w-xl overflow-x-scroll"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
