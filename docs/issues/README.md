# TurnAI Issues — Index

> Read [`../spec.md`](../spec.md) first. It is the single source of truth. Then read the specific issue file before starting work.

**Convention:** every issue file ends with an `## Execution Context` block. Karpathy reads the file, then implements. If Logic is ambiguous (flagged as `inferred`), ask Alex before proceeding.

**Status legend:** `Todo` · `In Progress` · `In Review` · `Done` · `Blocked`

---

## Phase 0 — Foundation (P1, blocks everything)

| ID | Title | Priority | Estimate | Status |
|---|---|---|---|---|
| [F1](F1-init-nextjs.md) | Initialize Next.js + Tailwind + shadcn + deploy to Vercel | P1 | S | Todo |
| [F2](F2-neon-drizzle.md) | Provision Neon Postgres + Drizzle schema scaffolding | P1 | S | Todo |
| [F3](F3-hardcoded-login.md) | Hardcoded `benja` login + protect `/app/*` routes | P1 | XS | Todo |
| [F4](F4-app-shell.md) | Mobile-first app shell + bottom tab bar + Spanish locale | P1 | M | Todo |
| [F5](F5-seed-reset-endpoint.md) | Seed script + `POST /api/reset` endpoint | P1 | S | Todo |
| [F6](F6-seed-content.md) | Demo content: 5 seeded conversations + patients + history | P1 | M | Todo |
| [F7](F7-design-tokens.md) | Design tokens: WhatsApp + Mercado Pago palettes & shadcn theme | P1 | S | Todo |

## Phase 1 — Calendar (spine of the demo)

| ID | Title | Priority | Estimate | Status |
|---|---|---|---|---|
| [C1](C1-calendar-week-view.md) | Calendar week view (mobile-first, swipeable) | P1 | M | Todo |
| [C2](C2-open-slot.md) | Manual slot creation — tap empty time → "Abrir turno" | P1 | S | Todo |
| [C3](C3-turn-detail-panel.md) | Display booked turns + tap-to-detail side panel | P1 | M | Todo |
| [C4](C4-asistio-ausente.md) | "Marcar asistido" / "Marcar ausente" actions | P1 | S | Todo |
| [C5](C5-reservar-existente.md) | "Reservar para paciente existente" from Calendar | P2 | S | Todo |
| [C6](C6-day-view.md) | Day view toggle (stretch) | P3 | S | Todo |

## Phase 2 — Patient booking page

| ID | Title | Priority | Estimate | Status |
|---|---|---|---|---|
| [B1](B1-booking-landing.md) | `/book/[link]` branded landing page | P1 | S | Todo |
| [B2](B2-slot-picker.md) | Slot picker — only open & unbooked slots | P1 | M | Todo |
| [B3](B3-contact-form.md) | Contact info form (nombre, WhatsApp, email) | P1 | S | Todo |
| [B4](B4-fake-mp-checkout.md) | Fake Mercado Pago checkout screen | P1 | S | Todo |
| [B5](B5-confirmation.md) | Confirmation screen + write booking + auto-create patient | P1 | S | Todo |
| [B6](B6-personalized-link.md) | Personalized link `/book/[link]?p=<id>` skips form | P2 | S | Todo |

## Phase 3 — Payments & Finance

| ID | Title | Priority | Estimate | Status |
|---|---|---|---|---|
| [P1](P1-fee-setup.md) | Fee setup — per-session price + flat deposit | P1 | S | Todo |
| [P2](P2-dashboard.md) | Dashboard — "Cobrado este mes" + "Proyectado este mes" | P1 | M | Todo |
| [P3](P3-outstanding-balances.md) | Outstanding balances list | P2 | S | Todo |
| [P4](P4-transactions.md) | Recent transactions list | P2 | S | Todo |

## Phase 4 — Inbox

| ID | Title | Priority | Estimate | Status |
|---|---|---|---|---|
| [I1](I1-conversation-list.md) | Conversation list view | P1 | S | Todo |
| [I2](I2-thread-view.md) | Conversation thread (WhatsApp-style bubbles) | P1 | M | Todo |
| [I3](I3-reply-box.md) | Reply box | P1 | S | Todo |
| [I4](I4-enviar-link.md) | "Enviar link de reserva" quick action | P1 | S | Todo |
| [I5](I5-convertir-paciente.md) | "Convertir a paciente" quick action | P2 | S | Todo |

## Phase 5 — Patients

| ID | Title | Priority | Estimate | Status |
|---|---|---|---|---|
| [Pt1](Pt1-patient-list.md) | Patients list | P1 | S | Todo |
| [Pt2](Pt2-patient-detail.md) | Patient detail (contact + session history) | P2 | M | Todo |
| [Pt3](Pt3-add-patient.md) | Add patient form | P2 | S | Todo |
| [Pt4](Pt4-edit-patient.md) | Edit patient | P3 | XS | Todo |
| [Pt5](Pt5-session-notes.md) | Per-session notes editing | P2 | S | Todo |

## Phase 6 — Reminders & time simulation

| ID | Title | Priority | Estimate | Status |
|---|---|---|---|---|
| [S1](S1-simular-dia.md) | "Simular día siguiente" button | P1 | M | Todo |
| [S2](S2-reminder-template.md) | Reminder message template | P1 | XS | Todo |

## Phase 7 — Settings

| ID | Title | Priority | Estimate | Status |
|---|---|---|---|---|
| [St1](St1-reset-button.md) | Reset Demo button in Ajustes | P1 | XS | Todo |

---

## Killer-path subset (25 issues)

If we have to ship the demo this week, this is the minimum required to perform the canonical flow end-to-end:

**F1, F2, F3, F4, F5, F6, F7, C1, C2, C3, C4, B1, B2, B3, B4, B5, P1, P2, I1, I2, I3, I4, Pt1, S1, S2, St1**

Cut for v1.1: C5, C6, B6, P3, P4, I5, Pt2, Pt3, Pt4, Pt5
