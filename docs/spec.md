# TurnAI MVP Demo — Consolidated Spec

> **Single source of truth.** If anything in an issue file contradicts this spec, this spec wins. Update both.

---

## What This Is

TurnAI is a **sales-demo prototype** — not a real production MVP — for booking and payment management aimed at independent health professionals in Argentina, starting with psychologists.

The goal is to give **Benja** (sales partner) a polished web app he can walk a prospective psychologist through end-to-end, demonstrating the value proposition without requiring any real WhatsApp or Mercado Pago integration.

**Everything is simulated. It is built to feel real.**

---

## The Canonical Demo Flow (memorize this)

1. Benja opens the **Inbox** → new lead "María" at the top
2. Reads chat → taps **"Enviar link de reserva"** → drops a `/book/[link]` URL into the chat
3. Switches tab → `/book/[link]` → picks a slot → fills the form → fake Mercado Pago checkout → confirmation
4. Switches back → **Agenda** shows the new turn, **Finanzas** shows the deposit, **Pacientes** shows María auto-created
5. Taps **"Simular día siguiente"** → automated reminder appears in María's chat
6. Day-of-session: taps **"Marcar asistido"** on the turn → balance auto-charged → Finanzas updates

This is the scene Benja walks through in 90 seconds. Every issue serves it.

---

## Architecture

- **Stack:** Next.js (App Router) + Tailwind + shadcn/ui + Neon Postgres (Drizzle ORM) + Vercel
- **Language:** Spanish only (Argentine voseo: "vos podés", "che", "dale")
- **Auth:** hardcoded `benja` login, server-side cookie, no library
- **Pro view:** `/app/*` — mobile-first, bottom tab bar (Inbox · Pacientes · Finanzas · Agenda)
- **Patient view:** `/book/[link]` — mobile-first
- Same Postgres backs both URLs — patient actions are visible live on the pro side. **This is the demo's magic moment.**
- One seeded pro: **Lic. Sofía García — Psicóloga**
- 5 seeded conversations + patients + history, realistic Argentine Spanish
- **Reset Demo** button re-seeds everything from a known starting state

---

## Pricing Configuration (in-app)

- Per-session price + flat deposit (e.g., `$25.000` ARS + `$7.500` deposit)
- Patient pays the deposit at booking; balance auto-charges after attending
- TurnAI's own SaaS pricing (`20K ARS/month`) is **NOT** surfaced in the app — Benja mentions it verbally during the pitch

---

## Visual Fidelity Bar (non-negotiable)

Both the WhatsApp clone and the Mercado Pago clone must be **visually close to the real apps**. A psychologist watching Benja's demo should momentarily wonder if they're looking at the real thing.

### WhatsApp (Inbox + thread view)
- Green palette: `#25D366` (primary), `#075E54` (header), `#DCF8C6` (outbound bubble)
- Same bubble shapes (rounded, tail on the talker's side)
- Same chat list layout (avatar circle · name · last message preview · timestamp · unread badge)
- Same thread header (avatar · name · "en línea" / last seen)
- Reply box bottom: text input + send button (paper plane)
- Recognizable, but not branded as WhatsApp anywhere (no logo, no name)

### Mercado Pago (checkout screen)
- Blue palette: `#009EE3` (primary), `#FFE600` (accent only if needed)
- MP-typical checkout layout: amount at the top, payment method below, "Pagar" CTA full-width at the bottom
- Familiar typography hierarchy
- Recognizable, but not branded as Mercado Pago (no logo, no name)

---

## Modules

| Module | URL | What's in it |
|---|---|---|
| **Inbox** | `/app/inbox` | WhatsApp-style chat list + thread + reply box + quick actions |
| **Pacientes** | `/app/pacientes` | Patient list + detail + per-session history + notes |
| **Finanzas** | `/app/finanzas` | Fee setup + dashboard (cobrado, proyectado, saldos, transacciones) |
| **Agenda** | `/app/agenda` | Week/day calendar + manual slot opening + turn detail + asistió/ausente |
| **Ajustes** | `/app/ajustes` | Reset Demo button |
| **Patient booking** | `/book/[link]` | Branded landing + slot picker + form + fake MP checkout + confirmation |

---

## Build Order (priority sequence)

1. **Foundation** (F1–F7) — blocks everything
2. **Calendar** (C1–C6) — spine of the demo
3. **Patient booking** (B1–B6) — closes the deposit loop
4. **Finance** (P1–P4) — shows where the money lands
5. **Inbox** (I1–I5) — opens the demo flow
6. **Patients** (Pt1–Pt5) — supporting surface
7. **Reminders** (S1–S2) — proves automation
8. **Settings** (St1) — Benja's reset button

---

## Out of Scope (explicitly)

- Real WhatsApp Business API integration
- Real Mercado Pago integration (sandbox or production)
- Patient-side cancellation / rescheduling
- Multi-pro / multi-tenant
- TurnAI's own SaaS billing UI
- Patient signup / login (patients only interact via `/book/[link]`)
- Real-time notifications outside the simulated reminder
- Reports / exports / tax / accounting features
- Day view in calendar (stretch only)

---

## Repo & Linear

- **Repo:** `/Users/alex/Documents/Projects/TurnAI`
- **Linear project (shell only):** [TurnAI MVP Demo](https://linear.app/handier/project/turnai-mvp-demo-f75b0bfe67bf) — issues live in `docs/issues/`, not Linear
