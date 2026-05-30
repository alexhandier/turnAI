export default function TokensPage() {
  const groups = [
    {
      label: "WhatsApp",
      tokens: [
        { name: "wa-primary", hex: "#25D366", bg: "bg-wa-primary", dark: false },
        { name: "wa-header", hex: "#075E54", bg: "bg-wa-header", dark: true },
        { name: "wa-bubble-in", hex: "#FFFFFF", bg: "bg-wa-bubble-in", dark: false, border: true },
        { name: "wa-bubble-out", hex: "#DCF8C6", bg: "bg-wa-bubble-out", dark: false },
        { name: "wa-bg", hex: "#ECE5DD", bg: "bg-wa-bg", dark: false },
        { name: "wa-tick", hex: "#34B7F1", bg: "bg-wa-tick", dark: false },
      ],
    },
    {
      label: "Mercado Pago",
      tokens: [
        { name: "mp-primary", hex: "#009EE3", bg: "bg-mp-primary", dark: true },
        { name: "mp-primary-dark", hex: "#0070C0", bg: "bg-mp-primary-dark", dark: true },
        { name: "mp-accent", hex: "#FFE600", bg: "bg-mp-accent", dark: false },
        { name: "mp-bg", hex: "#F5F5F5", bg: "bg-mp-bg", dark: false, border: true },
      ],
    },
    {
      label: "Brand",
      tokens: [
        { name: "brand-primary", hex: "#25D366", bg: "bg-brand-primary", dark: false },
        { name: "brand-ink", hex: "#0F172A", bg: "bg-brand-ink", dark: true },
      ],
    },
    {
      label: "shadcn semantic (via --primary)",
      tokens: [
        { name: "primary", hex: "#25D366", bg: "bg-primary", dark: false },
        { name: "primary-foreground", hex: "white", bg: "bg-primary-foreground", dark: false, border: true },
        { name: "muted", hex: "zinc-50", bg: "bg-muted", dark: false, border: true },
        { name: "muted-foreground", hex: "zinc-500", bg: "bg-muted-foreground", dark: true },
        { name: "destructive", hex: "red", bg: "bg-destructive", dark: true },
      ],
    },
  ];

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="mb-1 text-2xl font-bold text-brand-ink">Design Tokens</h1>
      <p className="mb-8 text-sm text-zinc-500">
        F7 — Reference palette. All colors available as Tailwind utilities (e.g.{" "}
        <code className="rounded bg-zinc-100 px-1">bg-wa-primary</code>,{" "}
        <code className="rounded bg-zinc-100 px-1">text-mp-primary</code>).
      </p>

      <div className="space-y-8">
        {groups.map((g) => (
          <section key={g.label}>
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-400">
              {g.label}
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {g.tokens.map((t) => (
                <div
                  key={t.name}
                  className={`${t.bg} flex h-20 flex-col justify-end rounded-xl p-3 ${t.border ? "border border-zinc-200" : ""}`}
                >
                  <p className={`text-xs font-semibold ${t.dark ? "text-white/90" : "text-zinc-700"}`}>
                    {t.name}
                  </p>
                  <p className={`text-[10px] ${t.dark ? "text-white/60" : "text-zinc-400"}`}>
                    {t.hex}
                  </p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Typography */}
      <section className="mt-8">
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-400">
          Typography scale
        </h2>
        <div className="space-y-2 rounded-xl border bg-white p-4">
          {[
            { cls: "text-2xl font-bold", label: "2xl / bold — Heading" },
            { cls: "text-lg font-semibold", label: "lg / semibold — Subheading" },
            { cls: "text-base font-normal", label: "base / normal — Body" },
            { cls: "text-sm text-muted-foreground", label: "sm / muted — Secondary" },
            { cls: "text-xs text-muted-foreground", label: "xs / muted — Caption" },
          ].map(({ cls, label }) => (
            <p key={label} className={cls}>
              {label}
            </p>
          ))}
        </div>
      </section>

      {/* Radius */}
      <section className="mt-8">
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-400">
          Radius scale
        </h2>
        <div className="flex flex-wrap gap-3">
          {[
            { cls: "rounded-sm", label: "sm" },
            { cls: "rounded-md", label: "md" },
            { cls: "rounded-lg", label: "lg" },
            { cls: "rounded-xl", label: "xl" },
            { cls: "rounded-2xl", label: "2xl" },
            { cls: "rounded-full", label: "full" },
          ].map(({ cls, label }) => (
            <div
              key={label}
              className={`${cls} flex h-12 w-12 items-center justify-center border-2 border-wa-primary bg-wa-bubble-out text-xs font-semibold text-zinc-600`}
            >
              {label}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
