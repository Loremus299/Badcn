import Showcase from "./_components/showcase";

export default function Page() {
  return (
    <div className="flex w-full justify-center">
      <main className="w-full max-w-7xl landscape:p-8 portrait:scale-95">
        <div className="h-[75vh] grid place-items-center">
          <div className="grid gap-3">
            <h1 className="text-center text-6xl tracking-tight font-semibold animate-space-in">
              Badcn: shadcn++
            </h1>
            <h2 className="text-center text-muted-foreground leading-5">
              Reusable components built on top Shadcn Base UI <br /> providing
              commonly used but unprovided components.
            </h2>
          </div>
        </div>
        <Showcase />
      </main>
    </div>
  );
}
