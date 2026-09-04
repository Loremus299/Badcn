import ComponentShowcase from "@/components/compShow";
import DemoRenderer from "@/components/demoRenderer";
import data from "@/registry.json";

export default function Showcase() {
  return (
    <div className="grid grid-cols-3 gap-4">
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
