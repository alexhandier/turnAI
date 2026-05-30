/**
 * Outer app shell — wraps all /app/* routes.
 * On desktop (≥ 1024px) this centers a 420px "phone frame" on a gray
 * background so Benja's demo on a laptop still looks like a phone.
 * On mobile the frame fills the viewport normally.
 */
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-zinc-100">
      <div className="mx-auto flex min-h-dvh max-w-[420px] flex-col bg-white shadow-2xl">
        {children}
      </div>
    </div>
  );
}
