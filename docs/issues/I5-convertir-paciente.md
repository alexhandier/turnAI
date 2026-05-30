# I5 — "Convertir a paciente" quick action

**Phase:** Inbox · **Priority:** P2 · **Estimate:** S · **Status:** Todo
**Dependencies:** I2
**Blocks:** none

## Context

For conversations that are still "leads" (no linked patient row), the pro can create a patient record directly from the chat. Useful talking point even outside the killer demo: "you can convert any lead into a patient with one tap."

## Acceptance Criteria

- [ ] When `conversation.patientId IS NULL`, the I2 thread header shows a quick action: **"👤 Convertir a paciente"**
- [ ] Tap → bottom sheet with a pre-filled form (name + WhatsApp from `conversation.contactName` / `contactWhatsapp`, email blank), editable
- [ ] Submit:
  - Creates a `patient` row (status `new`)
  - Updates `conversation.patientId` to link them
  - Action disappears (replaced by a small "Paciente desde [fecha]" subtitle in the header)
- [ ] Toast: "Paciente creado · [Nombre]"

## Logic (inferred — confirm or override)

1. After conversion, future booking links sent from this conversation should be personalized (handled by I4's lookup).
2. If a patient with the same normalized WhatsApp already exists, suggest linking to them instead of creating duplicate (defensive — shouldn't happen in seed but possible after demo interactions).

## Execution Context

- **Agent:** Karpathy
- **Repo:** `/Users/alex/Documents/Projects/TurnAI`
- **How to run:** Summon @Karpathy on `docs/issues/I5-convertir-paciente.md` after I2 is Done
