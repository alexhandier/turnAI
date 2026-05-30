import Link from "next/link";
import { ChevronLeft } from "lucide-react";

// Placeholder — St1 (Reset Demo button) will build the real settings page.
export default function AjustesPage() {
  return (
    <div className="flex flex-col">
      <header className="flex items-center gap-2 border-b border-zinc-100 px-4 py-3">
        <Link
          href="/app/agenda"
          className="rounded-full p-1 text-zinc-500 hover:bg-zinc-100"
          aria-label="Volver"
        >
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-sm font-semibold">Ajustes</h1>
      </header>
      <div className="flex items-center justify-center p-8 text-zinc-400">
        Ajustes — próximamente
      </div>
    </div>
  );
}
