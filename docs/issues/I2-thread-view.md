# I2 — Conversation thread (WhatsApp-style bubbles)

**Phase:** Inbox · **Priority:** P1 · **Estimate:** M · **Status:** Todo
**Dependencies:** I1, F7
**Blocks:** I3, I4, I5

## Context

The thread view. The visual centerpiece of the demo's opening beat. Must feel like WhatsApp. **Reference `/dev/wa-preview` from F7. Iterate on visuals with Alex before finalizing.**

## Acceptance Criteria

- [ ] `/app/inbox/[conversationId]` renders:
  - Top bar in `wa.header` color: back arrow · patient avatar + name + "en línea" subtitle · "..." overflow menu (placeholder)
  - Background: `wa.bg` color (warm beige-gray, like real WhatsApp)
  - Message bubbles:
    - **Inbound** (patient → pro): white bubble (`wa.bubbleIn`), left-aligned, with tail on the left
    - **Outbound** (pro → patient): pale-green bubble (`wa.bubbleOut`), right-aligned, with tail on the right + small double-tick (`wa.tick`) timestamp inside
  - Time label between bubbles when there's a >1h gap, formatted "HOY", "AYER", or "VIE 4 DE JUNIO"
  - Booking-link messages (`kind: 'booking_link'`): render as a clickable card inside the bubble showing the link domain + "Reservá tu turno" CTA — tapping opens the link in a new tab
  - Reminder messages (`kind: 'reminder'`): render with a small "🔔 Recordatorio automático" label above the bubble
- [ ] Auto-scrolls to the bottom on initial load
- [ ] When the conversation is opened, `unreadCount` resets to 0
- [ ] Below the messages, an empty space reserved for the I3 reply box (don't implement it here — just leave the slot)

## Logic (inferred — confirm or override)

1. Server-fetch all messages for this conversation, ordered ascending by `sentAt`.
2. The `unreadCount = 0` update runs as a fire-and-forget server action on page load (not awaited).
3. Bubble tail: implement as a CSS pseudo-element triangle or as a SVG mask — Karpathy picks the cleaner one after eyeballing the WA preview.
4. Date dividers: render between consecutive messages where the day changes.

## Execution Context

- **Agent:** Karpathy
- **Repo:** `/Users/alex/Documents/Projects/TurnAI`
- **How to run:** Summon @Karpathy on `docs/issues/I2-thread-view.md` after I1 + F7 are Done. Show Alex a screenshot before merging.
