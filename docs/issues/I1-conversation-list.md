# I1 — Conversation list view (WhatsApp-style)

**Phase:** Inbox · **Priority:** P1 · **Estimate:** S · **Status:** Todo
**Dependencies:** F4, F6, F7
**Blocks:** I2

## Context

The first screen the pro sees when they tap Inbox. Has to look unmistakably like WhatsApp's chat list. **Reference `/dev/wa-preview` from F7 first.**

## Acceptance Criteria

- [ ] `/app/inbox` shows a vertical list of conversations from F6 seed
- [ ] Each row:
  - Circular avatar on the left (patient's first initial in a colored circle if no photo)
  - Patient/contact name (bold)
  - Last message preview (single line, truncated)
  - Timestamp on the right (top): "16:42", "Ayer", "lun", or "12/04" depending on recency
  - Unread badge on the right (bottom): green circle with count, only when `unreadCount > 0`
- [ ] Sorted by `lastMessageAt` descending (newest at top)
- [ ] Tap a row → navigates to `/app/inbox/[conversationId]` (I2)
- [ ] Page header: "Mensajes" in `wa.header` color with a search icon (search is non-functional in v1, can be omitted)
- [ ] Visual treatment matches the F7 reference

## Logic (inferred — confirm or override)

1. Server-render the list. No realtime in v1 — page revalidates on navigation.
2. Avatar background color is deterministic from the patient name (hash → hue) so it's stable across renders.
3. María (the demo lead) is at the top of the list with unread badge = 2 (one inbound greeting, one inbound question).

## Execution Context

- **Agent:** Karpathy
- **Repo:** `/Users/alex/Documents/Projects/TurnAI`
- **How to run:** Summon @Karpathy on `docs/issues/I1-conversation-list.md` after F6 + F7 are Done
