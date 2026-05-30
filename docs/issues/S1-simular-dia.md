# S1 — "Simular día siguiente" button

**Phase:** Reminders & time sim · **Priority:** P1 · **Estimate:** M · **Status:** Todo
**Dependencies:** F2, F5, I2
**Blocks:** demo flow step 5

## Context

Benja's demo needs to show the "day before the session, an automated reminder goes out." Real time is too slow, so we fake it: a button advances the simulated clock by 24 hours and triggers any reminders that became due.

## Acceptance Criteria

- [ ] In `/app/ajustes`, below the Reset button, add **"Simular día siguiente"** with a small description: "Avanza el tiempo 24 hs y dispara recordatorios pendientes."
- [ ] Tapping it:
  - Confirmation dialog: "¿Avanzar simulación 24 hs?"
  - On confirm: `sim_clock.nowAt = nowAt + 24h`
  - Server scans all `turns` with `status = 'reserved'` whose `startAt` is now within the next 24 hours AND for which no reminder message exists yet → for each, insert an inbound `message` (kind: 'reminder', direction: 'inbound' from the pro's view? — clarify in logic) in the patient's conversation containing the templated reminder (from S2)
  - Actually, reminders are sent BY the pro/system TO the patient, so they're `direction: 'outbound'` in the conversation thread. (Adjust below.)
  - Wait — the *patient* receives the reminder. But the inbox represents the pro's view, where they see messages they sent (outbound, green) and messages they received (inbound, white). So a reminder appearing in the inbox is an **outbound** message that was auto-sent on the pro's behalf. ✅
- [ ] Toast: "Simulación avanzada · X recordatorio(s) enviado(s)"
- [ ] Inbox conversations with new reminders get their `lastMessageAt` + `unreadCount` updated (technically a sent-by-pro message wouldn't increment unread — actually it shouldn't, unread is for inbound. Leave unread alone but update lastMessageAt.)
- [ ] Calendar refreshes to show the new "today" (since the week view is anchored to `sim_clock.nowAt`)

## Logic (inferred — confirm or override)

1. Reminder direction: **outbound** (pro→patient). It appears in the chat as a green outbound bubble with a small "🔔 Recordatorio automático" label above it (rendered by I2's `kind: 'reminder'` branch).
2. Eligibility for reminder: `turn.status = 'reserved'` AND `turn.startAt ∈ [sim_clock.nowAt, sim_clock.nowAt + 24h]` AND no message with `kind: 'reminder'` exists for this turn yet (track via `messages.turnId` — add this column to the schema, nullable, or check by matching reminder body).
3. Schema tweak suggestion: add `messages.turnId` nullable so reminder messages can be tied back to a turn. Update F2 schema if not already done.
4. The button is in Ajustes — it's a "dev/demo" affordance, not a real feature, so it sits next to Reset.

## Execution Context

- **Agent:** Karpathy
- **Repo:** `/Users/alex/Documents/Projects/TurnAI`
- **How to run:** Summon @Karpathy on `docs/issues/S1-simular-dia.md` after F5 + I2 are Done
