# F2 — Provision Neon Postgres + Drizzle schema scaffolding

**Phase:** Foundation · **Priority:** P1 · **Estimate:** S · **Status:** In Review (awaiting Neon provisioning)
**Dependencies:** F1
**Blocks:** F3, F5, F6, all module phases

## Context

We need a persistent database from day one because the demo's magic moment is *the patient's booking action immediately appearing on the pro's side*. Same Postgres instance, both URLs.

## Acceptance Criteria

- [ ] Neon Postgres project provisioned (via Vercel Marketplace for one-click env vars) — **awaiting Alex**
- [ ] `DATABASE_URL` set in Vercel + `.env.local` — **awaiting Alex**
- [x] Drizzle ORM installed (`drizzle-orm`, `drizzle-kit`, `postgres`)
- [x] `src/db/schema.ts` exists with the tables below
- [ ] `pnpm db:push` runs and creates all tables — **awaiting DATABASE_URL**
- [x] `src/db/index.ts` exports a typed `db` client usable from server components, route handlers, and server actions
- [ ] A trivial server component or route can `SELECT 1` from the DB successfully on the deployed Vercel URL — **awaiting DATABASE_URL**

## Schema (locked)

```ts
// Single pro, hardcoded
pros: { id, name, specialty, photoUrl, createdAt }

// Pricing config (one row per pro)
pricing: { proId, sessionPriceCents, depositCents, currency, updatedAt }

// Patients
patients: {
  id, proId, name, whatsappNumber, email,
  status: 'new' | 'active' | 'churned',
  createdAt, updatedAt
}

// Inbox conversations (one per patient/lead)
conversations: {
  id, proId, patientId (nullable for leads not yet converted),
  contactName, contactWhatsapp,
  lastMessageAt, unreadCount,
  createdAt
}

// Individual chat messages
messages: {
  id, conversationId,
  direction: 'inbound' | 'outbound',
  body, sentAt,
  kind: 'text' | 'booking_link' | 'reminder' (default 'text')
}

// Calendar slots (an "open" slot is bookable; a slot becomes "booked" via a turn)
slots: {
  id, proId,
  startAt, endAt,
  status: 'open' | 'booked' | 'blocked',
  createdAt
}

// Turns = booked appointments
turns: {
  id, proId, slotId, patientId,
  startAt, endAt,
  sessionPriceCents, depositCents,
  status: 'reserved' | 'attended' | 'no_show' | 'canceled',
  notes (text, nullable),
  createdAt, updatedAt
}

// Payments — both deposits and balance charges
payments: {
  id, proId, turnId, patientId,
  amountCents,
  kind: 'deposit' | 'balance' | 'refund',
  paidAt,
  createdAt
}

// Simulated clock — single row, used by S1 "Simular día siguiente"
sim_clock: { id (always 1), nowAt }
```

## Logic (inferred — confirm or override)

1. Use Drizzle with `postgres` driver (Neon HTTP isn't required since we deploy on Vercel Node runtime).
2. All money is stored in cents (integer) to avoid float drift. UI formats with `Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' })`.
3. All timestamps are `timestamp with time zone`, stored in UTC, formatted to `America/Argentina/Buenos_Aires` in the UI.
4. `sim_clock` lets us reason about "now" without messing with system time — every "what time is it?" query goes through this row, so S1's "Simular día siguiente" just increments it by 24h.

## Execution Context

- **Agent:** Karpathy
- **Repo:** `/Users/alex/Documents/Projects/TurnAI`
- **How to run:** Open this repo in Cursor, summon @Karpathy on `docs/issues/F2-neon-drizzle.md` after F1 is Done
