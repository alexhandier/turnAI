# B6 — Personalized link `/book/[link]?p=<id>` skips contact form

**Phase:** Patient booking · **Priority:** P2 · **Estimate:** S · **Status:** Todo
**Dependencies:** B3, B5, I4
**Blocks:** none

## Context

When the pro sends a returning patient a booking link from the inbox (I4), the link is pre-tied to that patient — so they shouldn't have to re-enter their name/WhatsApp. Skip B3 and go straight from B2 to B4.

## Acceptance Criteria

- [ ] `/book/[link]?p=<patientId>` is a valid URL pattern
- [ ] When `p` is present and resolves to an existing patient:
  - B1 landing greets them: "Hola [Nombre] 👋"
  - B2 slot picker is identical
  - On slot select → skip B3, go straight to B4 with the patient's info pre-filled in the URL state
  - B5 confirmation uses the existing patient (no new patient row created)
- [ ] If `p` is invalid → ignore it silently, behave like the generic link

## Logic (inferred — confirm or override)

1. Personalized link generation lives in I4 — Inbox quick action "Enviar link de reserva" should produce a URL with `?p=<id>` if the conversation is linked to a patient, else fall back to the generic link.
2. Don't expose patient IDs as a security risk concern — this is a demo, all IDs are seeded, no PII protection needed.

## Execution Context

- **Agent:** Karpathy
- **Repo:** `/Users/alex/Documents/Projects/TurnAI`
- **How to run:** Summon @Karpathy on `docs/issues/B6-personalized-link.md` after B5 + I4 are Done
