# First birthday invitation

A bilingual (English + Tamil) invitation website with RSVP tracking. Built so you can send two WhatsApp links and guests see the invitation image in the chat preview.

## Stack

| Piece | Choice | Why |
| --- | --- | --- |
| App | **Next.js** (App Router) | Server-rendered pages, so WhatsApp can read the image tags |
| Styling | **Tailwind CSS** | Fast to design a card-like invite |
| RSVPs | **SQLite** locally, **Turso** (hosted SQLite) in production | Stays in the app — no Google Sheet. You view replies at `/admin` |
| Hosting | **Vercel** (free hobby plan) | Custom URLs, HTTPS, and Open Graph images that WhatsApp can fetch |

WhatsApp does not open your website inside the chat. It reads Open Graph tags (`og:image`, `og:title`) and shows that image. That is why this is a real website, not a PDF or a Google Form.

## Local development

```bash
npm install
npm run dev
```

- English invite: [http://localhost:3000/en](http://localhost:3000/en)
- Tamil invite: [http://localhost:3000/ta](http://localhost:3000/ta)
- Language picker: [http://localhost:3000](http://localhost:3000)
- Guest list: [http://localhost:3000/admin](http://localhost:3000/admin) (password `birthday` in `.env.local`)

## Edit the party details

Open `lib/event.ts` and change the name, date, time, venue, maps link, and “what to expect” lines. English and Tamil are separate fields.

## Deploy (get WhatsApp URLs)

1. Push this folder to GitHub.
2. Go to [vercel.com](https://vercel.com), sign in, and **Import** the repo.
3. Create a free [Turso](https://turso.tech) database so RSVPs survive deploys:

   ```bash
   brew install tursodatabase/tap/turso
   turso auth signup
   turso db create birthday-rsvp
   turso db show birthday-rsvp --url
   turso db tokens create birthday-rsvp
   ```

4. In Vercel → Project → Settings → Environment Variables, add:

   - `ADMIN_PASSWORD` — a private password for `/admin`
   - `NEXT_PUBLIC_SITE_URL` — your live URL, e.g. `https://first-birthday-invite.vercel.app`
   - `TURSO_DATABASE_URL`
   - `TURSO_AUTH_TOKEN`

5. Redeploy. Your WhatsApp links will be:

   - English: `https://YOUR-APP.vercel.app/en`
   - Tamil: `https://YOUR-APP.vercel.app/ta`

After the first deploy, paste each link into WhatsApp to yourself and check that the invitation card image appears. If WhatsApp shows an old preview, refresh the cache at [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/).

## WhatsApp tips

- Send the **link**, not a screenshot-only message. WhatsApp generates the image from the link.
- Use the Tamil URL for Tamil-speaking guests and the English URL for everyone else, so the preview text matches the page.
- The preview image is generated at `/en/opengraph-image` and `/ta/opengraph-image` (1200×630, the size WhatsApp expects).
