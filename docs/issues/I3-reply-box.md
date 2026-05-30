# I3 — Reply box

**Phase:** Inbox · **Priority:** P1 · **Estimate:** S · **Status:** Todo
**Dependencies:** I2
**Blocks:** demo flow (Benja typing during pitch)

## Context

The text input + send button at the bottom of a thread. WhatsApp-style. Sends an outbound message into the thread (local only — doesn't leave the system).

## Acceptance Criteria

- [ ] Fixed at the bottom of the thread view (above bottom tab bar, but the tab bar might be hidden inside thread view — let's hide it on the thread route for max chat real estate)
- [ ] White rounded text input with placeholder "Mensaje" + a paper-plane send button (`wa.primary` green) on the right
- [ ] Auto-grows to multi-line up to ~4 lines, then scrolls internally
- [ ] Sending posts a new outbound `message` row + updates `conversation.lastMessageAt` + appends to the thread (server action with optimistic UI update)
- [ ] Pressing Enter (without Shift) sends; Shift+Enter inserts a newline
- [ ] Send button is disabled when input is empty

## Logic (inferred — confirm or override)

1. Optimistic update: render the bubble immediately, then sync with the server. If the server action fails, revert + toast.
2. Hide the bottom tab bar on `/app/inbox/[conversationId]` so the reply box can sit at the very bottom (the back arrow in the thread header is the way out).
3. No emoji picker, no attachments. Just text.

## Execution Context

- **Agent:** Karpathy
- **Repo:** `/Users/alex/Documents/Projects/TurnAI`
- **How to run:** Summon @Karpathy on `docs/issues/I3-reply-box.md` after I2 is Done
