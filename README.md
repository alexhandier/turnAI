# turnAI

Booking and payment management for independent health professionals in LatAm.

## The Problem

Independent health professionals lose ~33% of their revenue to patient no-shows, manage their calendars by phone, and have no clean record of who paid what when. The existing alternatives are priced for clinics, not for solo practitioners.

## The Approach

- **Patient interface:** WhatsApp. No phone calls. No separate app to install.
- **Professional interface:** Mobile-first web app. One screen for calendar, payments, and attendance.
- **Payments:** Mercado Pago. Deposit charged at booking, balance charged after the patient attends. No-show? The pro keeps the deposit.

## The Flow

```
Patient needs help
  → finds pro (referral, Google, IG)
  → sends WhatsApp message
  → picks appointment slot
  → pays deposit (Mercado Pago)
  → confirmation
  → automated reminder
  → attends? → if yes, charged balance
                if no, deposit retained
```

## Local Development

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

Copy `.env.local.example` to `.env.local` and fill in the required values before running (see F2 for DB setup).

## Deployment

**Vercel preview URL:** _to be added after Vercel project import_

The app is deployed on Vercel. Environment variables (`DATABASE_URL`, etc.) are managed via Vercel's dashboard.

## Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS 4 + shadcn/ui
- **Database:** Neon Postgres via Drizzle ORM
- **Hosting:** Vercel

## Status

**2026-05-30** — F1 complete. Next.js scaffold live. Database and auth pending (F2, F3).

## License

To be decided.
