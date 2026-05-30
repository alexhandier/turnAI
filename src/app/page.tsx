import { copy } from "@/lib/copy";

export default function Home() {
  const isDev = process.env.NODE_ENV === "development";

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-4xl font-bold tracking-tight text-brand-ink">{copy.app.name}</h1>
      <p className="text-lg text-muted-foreground">
        {copy.app.proName} &mdash; {copy.app.proSpecialty}
      </p>
      <span className="rounded-full bg-brand-primary px-3 py-1 text-sm font-medium text-white">
        Tailwind OK
      </span>
      <a
        href="/app/agenda"
        className="mt-2 rounded-full bg-brand-primary px-6 py-2 text-sm font-semibold text-white shadow hover:opacity-90"
      >
        Ir a la app →
      </a>

      {isDev && (
        <div className="mt-8 flex flex-col items-center gap-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">Dev previews</p>
          {[
            { href: "/dev/tokens", label: "🎨 Design Tokens" },
            { href: "/dev/wa-preview", label: "💬 WhatsApp Preview" },
            { href: "/dev/mp-preview", label: "💳 Mercado Pago Preview" },
          ].map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="text-sm text-mp-primary underline underline-offset-2 hover:text-mp-primary-dark"
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </main>
  );
}
