# Karpathy — Decisions Log (TurnAI)

> Append-only. Newest at the top.

## 2026-05-30 — F5+F6: Sim clock anchor = 2026-06-15 10:00 ART

**Decision:** Fixed sim_clock anchor at 2026-06-15 10:00 ART (Monday, mid-month).
**Rationale:** Mid-June gives 6 attended sessions so far in the month (dashboard target), a clean 14-day forward window for open slots, and "tomorrow" = Jun 16 for Camila's next turn. Seed takes ~15s on Neon pooled — acceptable for demo reset, no optimisation needed yet.

## 2026-05-30 — dotenv-cli for db:* scripts

**Decision:** Added `dotenv-cli` dev dependency; db:push/generate/studio scripts use `dotenv -e .env.local -- drizzle-kit <cmd>`.
**Rationale:** drizzle-kit doesn't auto-load .env.local (only .env). Next.js handles .env.local for pnpm dev, but drizzle-kit runs outside Next.js. dotenv-cli is the standard one-liner fix without requiring code changes in drizzle.config.ts.

## 2026-05-30 — shadcn toast → sonner

**Decision:** Used `sonner` component instead of `toast` (deprecated in shadcn).
**Rationale:** shadcn CLI refuses to install `toast` and redirects to sonner. The F1 issue listed `toast` but it no longer exists. Sonner is the official replacement with identical UX.

## 2026-05-30 — Prettier added on top of ESLint

**Decision:** Added `prettier` + `prettier-plugin-tailwindcss` on top of `eslint-config-next`.
**Rationale:** F1 AC requires "ESLint + Prettier run cleanly." create-next-app doesn't include Prettier by default. Added `.prettierrc.json` (2sp, double quotes, semis, TW plugin) and `.prettierignore`.

## 2026-05-30 — Scaffold via temp dir due to npm naming

**Decision:** Scaffolded `create-next-app` in `/tmp/turnai` then rsynced into workspace.
**Rationale:** create-next-app rejects capital letters in the project name derived from the directory. Workspace dir is `TurnAI`. Temp dir + rsync is the cleanest workaround — no git artifacts, no partial files.
