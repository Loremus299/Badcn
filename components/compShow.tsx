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
    <Link href={url}>
      <div className="w-full aspect-video border bg-card rounded-md @container grid place-items-center">
        {children}
      </div>
      <div className="-mt-12 ml-3 text-sm">
        <h6>{name}</h6>
        <p className="text-muted-foreground text-xs">{description}</p>
      </div>
    </Link>
  );
}
