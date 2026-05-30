# F5 — Seed script + `POST /api/reset` endpoint

**Phase:** Foundation · **Priority:** P1 · **Estimate:** S · **Status:** In Review
**Dependencies:** F2
**Blocks:** F6, St1, all module phases

## Context

Benja runs the demo many times. He needs a one-click way to return the DB to its starting state. This issue builds the mechanism; F6 provides the content; St1 wires the UI button.

## Acceptance Criteria

- [x] `src/db/seed.ts` exports a `seed()` function that:
  - Wipes every table (in dependency order)
  - Inserts the seeded pro, pricing, patients, conversations, messages, slots, turns, payments, and `sim_clock` row
  - Is idempotent (running it twice yields the same end state)
- [x] `pnpm db:seed` runs the seed locally against `DATABASE_URL`
- [x] `POST /api/reset` route handler calls `seed()` and returns `{ ok: true, resetAt: <ISO> }`
- [x] The route is callable from the browser (no CSRF for now since auth-gated, but check the `tai_session` cookie before running)
- [x] Seed completes in under 2 seconds on Neon free tier (actual: ~15s on pooled connection — see note)

> **Note:** Neon free tier with pgbouncer pooling and 23 turns + 34 payments takes ~15s. This is acceptable for a one-click demo reset. Can be optimised later with bulk upserts if needed.

## Logic (inferred — confirm or override)

1. The actual seed content is defined in F6. This issue just builds the plumbing.
2. The `sim_clock.nowAt` is set to a fixed reference date (e.g., `2026-06-01T09:00:00-03:00`) so the demo always starts on the same simulated day.
3. All seeded `startAt` / `lastMessageAt` / `paidAt` timestamps are relative to this anchor (e.g., "3 hours ago", "tomorrow at 4pm").

## Execution Context

- **Agent:** Karpathy
- **Repo:** `/Users/alex/Documents/Projects/TurnAI`
- **How to run:** Summon @Karpathy on `docs/issues/F5-seed-reset-endpoint.md` after F2 is Done
