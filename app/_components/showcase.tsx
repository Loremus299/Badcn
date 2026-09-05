import ComponentShowcase from "@/components/compShow";
import DemoRenderer from "@/components/demoRenderer";
import data from "@/registry.json";

export default function Showcase() {
  return (
    <div className="grid xl:grid-cols-3 portrait:grid-cols-1 gap-4 gap-y-8 portrait:gap-8">
      {data.items.map((item) => (
        <ComponentShowcase
          key={item.name}
          name={item.name}
          url={`/${item.name}`}
          description={item.description}
        >
          <DemoRenderer path={item.files[0].demo} />
        </ComponentShowcase>
      ))}
    </div>
  );
}
