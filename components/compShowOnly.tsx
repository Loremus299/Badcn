export default function ComponentShowcaseOnly({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full aspect-video border bg-card rounded-md @container grid place-items-center">
      {children}
    </div>
  );
}
