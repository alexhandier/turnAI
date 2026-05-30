# Karpathy — L1 Active (TurnAI)

## Current Issue

**F1** — Initialize Next.js + Tailwind + shadcn + deploy to Vercel
**Status:** In Review — all 8 ACs done. Assigned to Alex to close.

## Implementation Notes

- Scaffolded via `create-next-app` into `/tmp/turnai` then rsynced (dir name `TurnAI` has capital letters which create-next-app rejects as a package name)
- `pnpm dev` → 200 at `/` confirmed locally; https://turn-ai.vercel.app live and rendering correctly
- `toast` is deprecated in shadcn — used `sonner` instead. No downstream impact.
- Prettier added on top of ESLint (create-next-app only ships ESLint). Config: 2 spaces, double quotes, semis, `prettier-plugin-tailwindcss`.
- `src/lib/copy.ts` created with shell-level Spanish strings. F4 will extend.
- `docs/issues/*`, `docs/spec.md`, `memory/jensen/*` were pre-existing untracked — committed them in the F1 commit.

## Open

- Next up: F2 (Neon + Drizzle), then F3, F4, F5, F6, F7 in order.

## Blockers

None.
