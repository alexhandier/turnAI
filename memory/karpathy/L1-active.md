# Karpathy — L1 Active (TurnAI)

## Current Issue

**F2** — Neon Postgres + Drizzle schema scaffolding
**Status:** In Review — all ACs done. Assigned to Alex to close.

## Implementation Notes (F2)

- drizzle-kit doesn't load .env.local automatically — added `dotenv-cli` and updated
  db:* scripts to `dotenv -e .env.local -- drizzle-kit <cmd>`
- Schema uses pgEnum for all enum columns. All money in cents (integer). All timestamps UTC+TZ.
- sim_clock table: single row (id=1), always read via `getNow()` — never `new Date()`
- `/api/health` confirmed `{"ok":true,"db":{"ok":1}}` on both localhost and turn-ai.vercel.app

## Completed

- **F1** — Next.js + Tailwind + shadcn scaffold (App Router, src/, es-AR). Live at turn-ai.vercel.app.
- **F2** — Neon Postgres + Drizzle. 9 tables pushed. Health route live.

## Next up

F3 → F4 → F5 → F6 → F7 (rest of Foundation phase)

## Blockers

None.
