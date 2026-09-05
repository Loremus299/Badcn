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
    <div>
      <div className="w-full aspect-video border bg-card rounded-md @container grid place-items-center">
        <div className="-mt-12">{children}</div>
      </div>
      <Link href={url}>
        <div className="-mt-12 text-sm">
          <h6 className="ml-3">
            {name
              .split("-")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
          </h6>
          <p className="ml-3 text-muted-foreground text-xs">{description}</p>
        </div>
      </Link>
    </div>
  );
}
