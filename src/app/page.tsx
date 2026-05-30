import { copy } from "@/lib/copy";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-4xl font-bold tracking-tight">{copy.app.name}</h1>
      <p className="text-lg text-muted-foreground">
        {copy.app.proName} &mdash; {copy.app.proSpecialty}
      </p>
      {/* Tailwind sanity check — bg-green-500 must render */}
      <span className="rounded-full bg-green-500 px-3 py-1 text-sm font-medium text-white">
        Tailwind OK
      </span>
    </main>
  );
}
