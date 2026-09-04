import Showcase from "./_components/showcase";

export default function Page() {
  return (
    <div className="flex w-full justify-center">
      <main className="w-full max-w-7xl landscape:p-4 portrait:scale-95">
        <h1 className="text-center text-4xl tracking-tight font-semibold">
          Badcn
        </h1>
        <Showcase />
      </main>
    </div>
  );
}
