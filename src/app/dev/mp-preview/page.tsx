import {
  ChevronRight,
  CreditCard,
  Lock,
  ShieldCheck,
  Smartphone,
  Wallet,
} from "lucide-react";

const METHODS = [
  {
    icon: CreditCard,
    label: "Tarjeta de crédito o débito",
    sub: "Visa, Mastercard, AMEX, Naranja X",
    selected: true,
  },
  {
    icon: Smartphone,
    label: "Cuenta de Mercado Pago",
    sub: "Saldo disponible y cuotas sin interés",
    selected: false,
  },
  {
    icon: Wallet,
    label: "Efectivo",
    sub: "Pago en puntos de cobro Rapipago / Pago Fácil",
    selected: false,
  },
];

export default function MpPreviewPage() {
  return (
    <div className="min-h-screen bg-mp-bg font-sans">
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <header className="bg-mp-primary px-5 py-6 text-white">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium opacity-90">Resumen de pago</p>
            <p className="mt-1 text-4xl font-bold tracking-tight">
              $ 7.500
            </p>
            <p className="mt-1 text-sm opacity-80">
              Consulta psicológica — señal
            </p>
          </div>
          {/* Stylised "MP" logo mark */}
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
            <span className="text-sm font-extrabold text-white">MP</span>
          </div>
        </div>

        {/* Seller info */}
        <div className="mt-5 flex items-center gap-3 rounded-xl bg-white/15 px-4 py-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/30 text-sm font-bold text-white">
            SG
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Lic. Sofía García</p>
            <p className="text-[11px] text-white/70">Psicóloga · Palermo, CABA</p>
          </div>
          <ShieldCheck className="ml-auto h-5 w-5 text-white/70" />
        </div>
      </header>

      {/* ── Payment method ─────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-md px-4 py-5">
        <p className="mb-3 text-sm font-semibold text-zinc-500">Elegí cómo pagás</p>

        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
          {METHODS.map((m, i) => (
            <div key={m.label}>
              {i > 0 && <div className="mx-4 border-t border-zinc-100" />}
              <div
                className={`flex cursor-pointer items-center gap-3 px-4 py-4 transition-colors ${
                  m.selected ? "bg-blue-50" : "hover:bg-zinc-50"
                }`}
              >
                {/* Radio */}
                <div
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                    m.selected
                      ? "border-mp-primary bg-mp-primary"
                      : "border-zinc-300"
                  }`}
                >
                  {m.selected && <div className="h-2 w-2 rounded-full bg-white" />}
                </div>

                <m.icon
                  className={`h-5 w-5 shrink-0 ${m.selected ? "text-mp-primary" : "text-zinc-400"}`}
                />

                <div className="min-w-0 flex-1">
                  <p className={`text-sm font-medium ${m.selected ? "text-mp-primary-dark" : "text-zinc-700"}`}>
                    {m.label}
                  </p>
                  <p className="text-xs text-zinc-400">{m.sub}</p>
                </div>
                <ChevronRight className="h-4 w-4 shrink-0 text-zinc-300" />
              </div>
            </div>
          ))}
        </div>

        {/* ── Card form (shown since card is selected) ────────────────────── */}
        <div className="mt-4 overflow-hidden rounded-2xl bg-white p-4 shadow-sm">
          <p className="mb-4 text-sm font-semibold text-zinc-600">Datos de tu tarjeta</p>

          {/* Card number */}
          <div className="mb-3">
            <label className="mb-1 block text-xs text-zinc-500">Número de tarjeta</label>
            <div className="flex items-center gap-2 rounded-xl border border-zinc-200 px-3 py-3">
              <CreditCard className="h-4 w-4 text-zinc-300" />
              <span className="flex-1 text-sm tracking-widest text-zinc-300">
                •••• •••• •••• ••••
              </span>
            </div>
          </div>

          {/* Expiry + CVV */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs text-zinc-500">Vencimiento</label>
              <div className="rounded-xl border border-zinc-200 px-3 py-3 text-sm text-zinc-300">
                MM / AA
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs text-zinc-500">Código de seguridad</label>
              <div className="flex items-center gap-2 rounded-xl border border-zinc-200 px-3 py-3">
                <span className="flex-1 text-sm text-zinc-300">•••</span>
                <Lock className="h-3.5 w-3.5 text-zinc-300" />
              </div>
            </div>
          </div>

          {/* Name */}
          <div className="mt-3">
            <label className="mb-1 block text-xs text-zinc-500">Nombre en la tarjeta</label>
            <div className="rounded-xl border border-zinc-200 px-3 py-3 text-sm text-zinc-300">
              Como figura en la tarjeta
            </div>
          </div>
        </div>

        {/* ── Security badges ─────────────────────────────────────────────── */}
        <div className="mt-5 flex items-center justify-center gap-2 text-zinc-400">
          <Lock className="h-3.5 w-3.5" />
          <span className="text-xs">Compra protegida · SSL 256-bit · Mercado Pago</span>
        </div>

        {/* ── CTA ─────────────────────────────────────────────────────────── */}
        <button
          className="mt-4 w-full rounded-2xl py-4 text-base font-bold text-white shadow-md transition-opacity hover:opacity-90 active:opacity-80"
          style={{ background: "#009EE3" }}
        >
          Confirmar pago de $&nbsp;7.500
        </button>

        {/* Yellow accent bar */}
        <div className="mt-3 flex items-center justify-center gap-2">
          <div className="h-1.5 w-1.5 rounded-full bg-mp-accent" />
          <p className="text-[10px] text-zinc-400">
            Una vez confirmada la señal, Sofía te enviará la confirmación por WhatsApp.
          </p>
        </div>
      </div>
    </div>
  );
}
