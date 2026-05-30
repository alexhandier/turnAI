import Link from "next/link";
import { notFound } from "next/navigation";

export default function DevLayout({ children }: { children: React.ReactNode }) {
  if (process.env.NODE_ENV !== "development") {
    notFound();
  }
  return (
    <div className="min-h-dvh bg-zinc-50">
      <nav className="sticky top-0 z-10 flex items-center gap-4 border-b bg-white px-4 py-2 text-sm shadow-sm">
        <span className="font-semibold text-zinc-400">DEV</span>
        <Link href="/dev/tokens" className="text-zinc-600 hover:text-zinc-900">
          Tokens
        </Link>
        <Link href="/dev/wa-preview" className="text-zinc-600 hover:text-zinc-900">
          WA Preview
        </Link>
        <Link href="/dev/mp-preview" className="text-zinc-600 hover:text-zinc-900">
          MP Preview
        </Link>
        <Link href="/" className="ml-auto text-zinc-400 hover:text-zinc-600">
          ← Home
        </Link>
      </nav>
      {children}
    </div>
  );
}
