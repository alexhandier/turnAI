# C3 — Display booked turns + tap-to-detail side panel

**Phase:** Calendar · **Priority:** P1 · **Estimate:** M · **Status:** Todo
**Dependencies:** C1, F6
**Blocks:** C4, Pt5

## Context

Booked turns on the grid are clickable. Tap → bottom sheet (mobile) / side panel (desktop) with everything about that turn: patient, time, paid amounts, notes. From here the pro also marks asistió/ausente (C4) and edits notes (shared with Pt5).

## Acceptance Criteria

- [ ] Each booked turn on the grid shows patient name + a small paid/owed badge
- [ ] Tap on a booked turn → bottom sheet slides up with:
  - Patient name + a small chip with their status ("Nuevo", "Activo")
  - Date + time + duration ("Hoy, 16:00 – 16:50")
  - "Depósito pagado: $7.500" + "Saldo: $17.500 pendiente / cobrado"
  - WhatsApp number + a deep-link button "Abrir conversación" → navigates to `/app/inbox/[conversationId]`
  - Notes textarea (multi-line, editable, autosave on blur via server action)
  - Action buttons (depending on status — implemented in C4): "Marcar asistido" · "Marcar ausente"
- [ ] Sheet can be dismissed via swipe-down or backdrop tap
- [ ] If turn status is `attended` → notes label reads "Notas de la sesión"; if `reserved` → reads "Notas (opcional)"

## Logic (inferred — confirm or override)

1. Notes autosave: on textarea blur, fire a `updateTurnNotes(turnId, notes)` server action. Debounce client-side at 800ms while typing for a "saved" indicator.
2. The bottom-sheet pattern uses shadcn `Sheet` with `side="bottom"`.
3. The "Abrir conversación" deep-link finds the conversation by `patientId`. If multiple conversations exist for one patient (shouldn't happen in v1 seed but defensive), pick the most recent.

## Execution Context

- **Agent:** Karpathy
- **Repo:** `/Users/alex/Documents/Projects/TurnAI`
- **How to run:** Summon @Karpathy on `docs/issues/C3-turn-detail-panel.md` after C1 + F6 are Done
