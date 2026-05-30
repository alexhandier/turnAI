import { logout } from "./actions";

/**
 * Minimal app shell — placeholder until F4 ships the real bottom tab bar.
 * F4 will replace this file entirely.
 */
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center justify-between border-b border-zinc-200 bg-white px-4 py-3">
        <span className="text-sm font-semibold">TurnAI</span>
        <form action={logout}>
          <button
            type="submit"
            className="text-sm text-zinc-500 underline-offset-2 hover:underline"
          >
            Cerrar sesión
          </button>
        </form>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
