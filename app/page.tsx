import ToolTipButton from "@/components/registry/ToolTipButton";

export default function Page() {
  return (
    <div className="grid place-items-center min-h-screen w-full">
      <ToolTipButton tip={<p>Hi</p>}>
        <p>A really big button</p>
      </ToolTipButton>
    </div>
  );
}
