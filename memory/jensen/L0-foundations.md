# Jensen — L0 Foundations (TurnAI)

## Project Identity

**TurnAI** — booking and payment management for independent health professionals in Argentina. First client type: psychologists. Sales-led GTM via partner Benja.

## Repo

`/Users/alex/Documents/Projects/TurnAI` — submodule `.brain` points to /brain.

## Source of Truth Hierarchy

1. `docs/spec.md` — consolidated product spec, wins over everything
2. `docs/issues/*.md` — per-issue specs, each with Context · Acceptance Criteria · Logic · Execution Context
3. `docs/issues/README.md` — issue index + status

Linear is a shell for visibility only ([project](https://linear.app/handier/project/turnai-mvp-demo-f75b0bfe67bf)). Issues are NOT tracked there.

## Agent Roles

- **Jensen** (me) — scopes issues, never writes code
- **Karpathy** — implements one issue per session, reads spec.md + the issue file
- When Karpathy is summoned, the issue file's `## Execution Context` tells him where he is and what to do

## What This Product Is (Locked)

A **sales-demo prototype** — not a production MVP. Everything simulated. Built to feel real.
