# S2 — Reminder message template

**Phase:** Reminders & time sim · **Priority:** P1 · **Estimate:** XS · **Status:** Todo
**Dependencies:** none
**Blocks:** S1

## Context

The exact text of the automated reminder. One template, parameterized, in Argentine voseo. Sounds warm and human, not robotic.

## Acceptance Criteria

- [ ] Export a function `renderReminder({ patientName, turnStartAt, proName })` → string
- [ ] Default template (locked):
  > ¡Hola [Nombre]! 👋 Te recordamos tu turno mañana **[día de la semana] a las [hora]** con **[Pro]**. Si necesitás reprogramar, escribinos por acá. ¡Te esperamos! 💚
- [ ] Date format: "mañana viernes a las 16:00" (lowercase day, "a las" + 24h time)
- [ ] If the turn is today (edge case), use "hoy" instead of "mañana"
- [ ] Function is used by S1 when generating reminder messages

## Logic (inferred — confirm or override)

1. Locale: `es-AR`, timezone `America/Argentina/Buenos_Aires`.
2. Bold markdown (`**...**`) is rendered as bold in the I2 bubble if it supports markdown; otherwise strip the asterisks. Karpathy decides: cleaner to either (a) keep markdown and render in bubbles or (b) drop the bolding.

## Execution Context

- **Agent:** Karpathy
- **Repo:** `/Users/alex/Documents/Projects/TurnAI`
- **How to run:** Summon @Karpathy on `docs/issues/S2-reminder-template.md` — can be done in parallel with any other issue
