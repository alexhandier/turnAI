# Karpathy — L1 Active (TurnAI)

## Current Issue

**F7** — Design tokens: WhatsApp + Mercado Pago palettes & shadcn theme
**Status:** In Progress

## Implementation Notes

### Auth (F3)
- Custom HMAC-SHA256 JWT via Web Crypto API in `src/lib/auth.ts`
- Cookie: `tai_session`, httpOnly, secure, 8h expiry
- Middleware guards `/app/:path*`, redirects to `/login`
- Credentials: `DEMO_USER=benja`, `DEMO_PASSWORD=turnai2026`
- Vercel env vars: AUTH_SECRET, DEMO_USER, DEMO_PASSWORD must be set in dashboard

### App Shell (F4)
- `/app/layout.tsx` — phone-frame container (max-w-[420px], shadow-2xl, bg-zinc-100 outer)
- `/app/(tabs)/layout.tsx` — AppHeader + scrollable main + BottomTabBar
- `src/components/app/header.tsx` — pro initials avatar, Sheet for logout
- `src/components/app/bottom-tab-bar.tsx` — 4 tabs (Inbox, Pacientes, Finanzas, Agenda), lucide icons
- shadcn Sheet used for header menu; `asChild` NOT supported in this version of @base-ui/react

### Seed (F5+F6)
- `src/db/seed.ts` — idempotent `seed()`, ~15s on Neon pooled (acceptable)
- Sim clock anchor: **2026-06-15 10:00 ART**
- 5 patients, 58 slots, 23 turns, 34 payments
- Dashboard: 6 attended in June, 5 upcoming, 1 outstanding (Florencia Jun 15)
- `pnpm db:seed` — dotenv + tsx runner
- `POST /api/reset` — auth-gated (tai_session cookie required)

## Completed

- **F1** — Next.js + Tailwind + shadcn scaffold. Live at turn-ai.vercel.app.
- **F2** — Neon Postgres + Drizzle. 9 tables. `/api/health` live.
- **F3** — Hardcoded login. JWT auth. Middleware. Works on Vercel.
- **F4** — App shell: phone frame, header, bottom tab bar, route groups.
- **F5** — Seed plumbing: seed(), pnpm db:seed, POST /api/reset.
- **F6** — Demo content: 5 patients, full Argentine Spanish conversations, turns, payments.

## Next up

F7 → (C1, I1, Pt1, B1 — module phases)

## Blockers

None.
