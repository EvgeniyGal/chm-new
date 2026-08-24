# ТОВ «Чорномормонтаж»

Luxury marketing site for LLC Chornomormontazh — industrial design, installation, on-site repair, and an in-house testing laboratory in Odesa.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- shadcn/ui primitives
- next-intl (Ukrainian default, English via header flags)
- Mailgun for the contact form

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The root path redirects to `/uk`.

## Mailgun

Set these in `.env.local`:

- `MAILGUN_API_KEY`
- `MAILGUN_DOMAIN`
- `MAILGUN_FROM` — verified sender, e.g. `Chornomormontazh <noreply@your-domain>`
- `CONTACT_TO_EMAIL` — defaults to `office@chm.in.ua`
