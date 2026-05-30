# Jensen — Decisions Log (TurnAI)

> Append-only. Newest at the top.

## 2026-05-30 — Pass 2 skipped, logic inferred

**Decision:** Per Alex's request, did not collect inputs/outputs/logic per issue. Logic sections in each issue file are flagged as "inferred — confirm or override" so Karpathy knows what's assumed vs. locked.
**Rationale:** Time pressure. Risk: Karpathy may implement an inferred logic that Alex would have specified differently. Mitigation: every Logic section explicitly invites override.

## 2026-05-30 — Linear pivoted to local markdown

**Decision:** Hit Linear's issue limit. Issues live in `docs/issues/*.md`, one file each. Linear project is a shell.
**Rationale:** Free tier cap. Markdown in-repo is actually a better fit for Karpathy-driven execution since the issue lives next to the code it spawns.

## 2026-05-30 — Simulated clock via sim_clock table

**Decision:** All "now" queries route through `sim_clock.nowAt`, not `new Date()`.
**Rationale:** "Simular día siguiente" needs to advance time cleanly without messing with system clocks or test fixtures. One table row, one increment, every downstream query sees the new "now" automatically.

## 2026-05-30 — Same DB backs pro and patient views

**Decision:** `/app/*` (pro) and `/book/[link]` (patient) share the same Postgres. Patient actions appear live on the pro side.
**Rationale:** This is the demo's magic moment. Two scripted-but-disconnected sides would kill the wow factor.

## 2026-05-30 — Auth: hardcoded benja login, no library

**Decision:** Signed cookie + Next.js middleware. No NextAuth / Auth.js.
**Rationale:** One demo account, no real users. Library overhead would slow F3 from XS to S+. Easy to swap later if we go real.

## 2026-05-30 — Stack: Next.js + Tailwind + shadcn + Neon + Vercel

**Decision:** Use Next.js (App Router), Tailwind CSS, shadcn/ui, Neon Postgres via Drizzle, deployed on Vercel.
**Rationale:** Fastest path to mobile-first web app with great DX. Vercel + Neon = one-click env provisioning. Spanish UI from day one.

## 2026-05-30 — Project shape locked

**Decision:** TurnAI is a sales-demo prototype, not a production MVP. Everything simulated.
**Rationale:** Benja needs to start pitching in days, not months. Real WhatsApp Business API + Mercado Pago integration = weeks of KYC and infra. Simulation gets Benja in front of psychologists immediately and de-risks demand validation before building real integrations.
