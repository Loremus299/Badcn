export default function ComponentShowcase({
  children,
  name,
  description,
}: {
  children: React.ReactNode;
  name: string;
  description: string;
}) {
  return (
    <div>
      <div className="w-full aspect-video border bg-card/25 rounded-md @container grid place-items-center">
        {children}
      </div>

      <div className="-mt-12 ml-3 text-sm">
        <h6>{name}</h6>
        <p className="text-muted-foreground text-xs">{description}.</p>
      </div>
    </div>
  );
}
