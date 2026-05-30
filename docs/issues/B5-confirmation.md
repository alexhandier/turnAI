# B5 — Confirmation screen + write booking + auto-create patient

**Phase:** Patient booking · **Priority:** P1 · **Estimate:** S · **Status:** Todo
**Dependencies:** B4
**Blocks:** demo flow steps 4 + 5

## Context

The payoff screen on the patient side. Confirms the booking, shows what to expect, and writes everything to the DB so the pro side reflects it immediately. After this lands, Benja switches back to the pro tab and the magic happens.

## Acceptance Criteria

- [ ] `/book/[link]/confirmado?turn=<id>` renders:
  - Big green checkmark icon
  - Headline "¡Turno confirmado!"
  - Card with: day + date + time + pro name + duration
  - Line: "Depósito de $7.500 pagado. Saldo de $17.500 se cobrará después de la sesión."
  - Line: "Te enviamos los detalles por WhatsApp y un recordatorio el día anterior."
  - Secondary action: "Reservar otro turno" → routes back to B2
- [ ] Patient row exists (created if new, matched by WhatsApp or email if returning)
- [ ] If patient is new: `patient.status = 'new'`; if existing, untouched
- [ ] Turn row exists with `status = 'reserved'`
- [ ] Slot row updated to `status = 'booked'`
- [ ] Payment row exists with `kind = 'deposit'`
- [ ] Conversation row exists for this patient (created if not, or matched if patient already had one)
- [ ] An inbound system message is inserted in the conversation: "✅ Turno confirmado para el [fecha] a las [hora]. Te espero. 💚 — Lic. Sofía García" (kind: 'text', direction: 'inbound' from the pro's perspective — wait, this should be **outbound** since it's sent by the pro to the patient — but for the demo it's a system-generated message that appears in the thread, attributed as outbound on the pro's behalf)

## Logic (inferred — confirm or override)

1. The "auto-write" actually happens at the end of B4's server action when payment succeeds; this issue is mostly the confirmation render + ensuring the conversation message is created.
2. Patient matching: by normalized WhatsApp first, then email. If both differ from any existing patient → create new.
3. The system confirmation message in the thread is `direction: 'outbound'` (pro → patient), so it appears as a green outbound bubble in the inbox. This is what Benja sees when he switches back to the pro tab.

## Execution Context

- **Agent:** Karpathy
- **Repo:** `/Users/alex/Documents/Projects/TurnAI`
- **How to run:** Summon @Karpathy on `docs/issues/B5-confirmation.md` after B4 is Done
