import Link from "next/link";

export default function ComponentShowcase({
  children,
  name,
  description,
  url,
}: {
  children: React.ReactNode;
  name: string;
  description: string;
  url: string;
}) {
  return (
    <div className="bg-card border rounded-md">
      <div className="aspect-video grid place-items-center overflow-hidden overflow-y-scroll">
        {children}
      </div>
      <div className="p-4 pt-3 pb-3 border-t">
        <Link href={url}>
          <div className="text-sm">
            <h6>
              {name
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </h6>
            <p className="text-muted-foreground text-xs">{description}</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
