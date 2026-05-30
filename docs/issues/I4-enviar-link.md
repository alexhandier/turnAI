# I4 — "Enviar link de reserva" quick action

**Phase:** Inbox · **Priority:** P1 · **Estimate:** S · **Status:** Todo
**Dependencies:** I2, I3, B1
**Blocks:** demo flow step 2

## Context

The single most important button in the demo. Benja taps this → a booking link appears in the chat → he opens it in a second tab → patient books. The whole demo hinges on this beat.

## Acceptance Criteria

- [ ] In the I2 thread header (or as a floating quick-action above the I3 reply box), add a button: **"📅 Enviar link de reserva"**
- [ ] Tapping it:
  - Inserts an outbound `message` with `kind: 'booking_link'` containing a templated text: "¡Hola! Te dejo el link para reservar tu turno: <url>"
  - The `<url>` is `https://<host>/book/lic-sofia-garcia` (generic) OR `https://<host>/book/lic-sofia-garcia?p=<patientId>` if `conversation.patientId` is set
  - The bubble renders as a rich link card (per I2 spec for `kind: 'booking_link'`)
- [ ] Brief toast: "Link enviado"
- [ ] If the conversation has no linked patient (`patientId IS NULL`), the link is the generic one — the patient will fill the contact form themselves

## Logic (inferred — confirm or override)

1. The actual URL host comes from `process.env.NEXT_PUBLIC_APP_URL` (set during F1).
2. The template text is hardcoded in v1 ("¡Hola! Te dejo el link..."). Configurable templates are out of scope.
3. The link bubble is tappable — tapping in the pro's view opens it in a new tab (handy for Benja during the demo).

## Execution Context

- **Agent:** Karpathy
- **Repo:** `/Users/alex/Documents/Projects/TurnAI`
- **How to run:** Summon @Karpathy on `docs/issues/I4-enviar-link.md` after I2 + I3 + B1 are Done
