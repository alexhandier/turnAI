# F1 — Initialize Next.js + Tailwind + shadcn + deploy to Vercel

**Phase:** Foundation · **Priority:** P1 · **Estimate:** S · **Status:** In Review
**Dependencies:** none
**Blocks:** everything

## Context

Stand up the project skeleton so all subsequent issues have a place to land. No business logic in this issue — just the boilerplate, locale, and a live URL.

## Acceptance Criteria

- [x] `pnpm dev` starts a Next.js (App Router) app locally on port 3000
- [x] Tailwind CSS is configured and a class like `bg-green-500` renders
- [x] shadcn/ui is initialized (`components/ui/` exists, at least `Button` and `Sheet` installed)
- [x] Spanish locale set: `<html lang="es-AR">` and a `lib/copy.ts` (or similar) module exists for Spanish strings
- [x] App is deployed to Vercel at a stable preview URL — https://turn-ai.vercel.app (recorded in `README.md`)
- [x] Root path `/` shows a placeholder "TurnAI" page with the pro name "Lic. Sofía García"
- [x] TypeScript strict mode is on
- [x] ESLint + Prettier run cleanly

## Logic (inferred — confirm or override)

1. `pnpm dlx create-next-app@latest . --typescript --tailwind --app --eslint --src-dir --import-alias "@/*"`
2. `pnpm dlx shadcn@latest init` — choose Neutral base color, CSS variables yes
3. `pnpm dlx shadcn@latest add button sheet input label card badge avatar dialog toast`
4. Set `<html lang="es-AR">` in `app/layout.tsx`; set `<title>TurnAI</title>` and meta description in Spanish
5. Create `src/lib/copy.ts` exporting a flat object of Spanish strings used by the shell (tab labels, page titles, common buttons)
6. Push to GitHub, link Vercel project, deploy. Use Vercel env vars later for DB.

## Execution Context

- **Agent:** Karpathy
- **Repo:** `/Users/alex/Documents/Projects/TurnAI`
- **How to run:** Open this repo in Cursor, then summon @Karpathy with `read docs/spec.md and docs/issues/F1-init-nextjs.md, then implement`
