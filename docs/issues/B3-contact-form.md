# B3 — Contact info form (nombre, WhatsApp, email)

**Phase:** Patient booking · **Priority:** P1 · **Estimate:** S · **Status:** Todo
**Dependencies:** B2
**Blocks:** B4

## Context

Patient enters their info before paying. Three fields, minimal friction. Show the picked slot context at the top so they know what they're confirming.

## Acceptance Criteria

- [ ] `/book/[link]/contact?slot=<slotId>` renders:
  - Top: small summary card with picked slot ("Lunes 3 de junio · 16:00 · 50 min · con Lic. Sofía García · Depósito: $7.500")
  - Form fields:
    - **Nombre y apellido** (required, min 2 words)
    - **WhatsApp** (required, format `+54 9 11 1234-5678`, validation auto-formats)
    - **Email** (required, valid email)
  - Submit button: "Continuar al pago" (full-width, primary)
  - Back link: "← Cambiar horario"
- [ ] Invalid fields show inline Spanish error messages on blur ("Ingresá un número de WhatsApp válido")
- [ ] Submit posts the data + slotId to a server action → stores in URL state or session → redirects to `/book/[link]/pago`
- [ ] If the slot is no longer available (race condition) → toast "Ese horario ya no está disponible" + redirect back to B2

## Logic (inferred — confirm or override)

1. Don't write to DB yet — defer until payment "succeeds" (B5). Pass form values through to B4 via search params or a signed cookie (probably search params for simplicity).
2. Phone validation: keep it loose — accept "11 1234 5678", "+5491112345678", etc. Normalize to E.164 (`+5491112345678`) on submission.
3. Server action checks slot availability inside a transaction before redirecting.

## Execution Context

- **Agent:** Karpathy
- **Repo:** `/Users/alex/Documents/Projects/TurnAI`
- **How to run:** Summon @Karpathy on `docs/issues/B3-contact-form.md` after B2 is Done
