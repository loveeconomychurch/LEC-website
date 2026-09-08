# LEC-website — Cursor agent brief

Public marketing + community site for **Love Economy Church**, with a Firebase CMS admin and a simple merch store. Feed this file into Cursor (`@AGENTS.md`) before changing the site.

## Quick start

```bash
pnpm install
pnpm dev
```

Optional env: `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` (Locations maps). Firebase client config is hardcoded in `lib/firebase.ts` (`projectId: "le-church-app"`).

| Script                          | Purpose                                     |
| ------------------------------- | ------------------------------------------- |
| `pnpm dev`                    | Local Next server                           |
| `pnpm build` / `pnpm start` | Production build (`output: 'standalone'`) |
| `pnpm lint`                   | ESLint                                      |

Package manager is **pnpm** (`pnpm-lock.yaml`). Do not switch to npm without a reason.

## What this app is

- Public pages: home, about, visit, give, serve, events, live, locations, ministries, merch, etc.
- **CMS** at `/admin` — staff edit section content in Firestore; pages merge Firestore over defaults.
- **Merch** — products/orders in Firestore; cart in `localStorage` (`lec-merch-cart`). No payment gateway in-repo.

Not part of the Mishenah leadership stack (admin/finance/first-timers/mobile), but same Firebase project id in client config.

## Stack

- Next.js **14.2** App Router, React 18, TypeScript
- Tailwind CSS v4, shadcn/ui (New York), Radix, Lucide, framer-motion
- Firebase Auth / Firestore / Storage / Analytics (client SDK)
- Fonts: Anton + Montserrat
- Path alias: `@/*` → repo root

## Layout

```
app/                 # Routes (thin pages)
components/          # *-section.tsx public UI; admin/* editors; cart/; ui/
hooks/               # use-site-content, merch hooks
lib/
  firebase.ts        # Init
  cms.ts             # getContent / setContent
  content-defaults.ts
  merch.ts, storage.ts, admin-pages.ts
  types/cms.ts, types/merch.ts
public/              # Static media
```

## CMS model (do not break)

- Collection: `content`
- Doc id = `ContentSectionId` (e.g. `hero`, `giveHero`)
- Shape: `{ id, data, updatedAt }`
- Public read; authenticated write (`firestore.rules`)
- Public sections use `useSiteContent` + `data-cms-section="…"` for admin preview scroll

**Adding a CMS section:** extend `ContentSectionId` + types → defaults in `content-defaults.ts` → wire `ADMIN_PAGES` → editor component → section uses `useSiteContent`.

## Merch model

| Collection                  | Notes                                  |
| --------------------------- | -------------------------------------- |
| `merch_products`          | Public read; auth write                |
| `merch_orders`            | Anyone create; auth read/update/delete |
| `merch_config/categories` | Public read; auth write                |

## Admin auth

- `/admin/login` — Firebase email/password
- Any signed-in user can write CMS/merch (rules: `request.auth != null`)
- Preview: iframe + `postMessage` `cms-scroll-to-section` via `CmsPreviewListener`

## Conventions for agents

1. Keep pages thin: Header + section(s) + Footer.
2. Match existing section/editor naming and Tailwind/shadcn patterns.
3. Prefer editing `content-defaults.ts` + CMS types over hardcoding copy in JSX when the section is CMS-backed.
4. `next.config.mjs` ignores ESLint/TS errors during build — still fix real type errors you introduce.
5. Never commit `.env*` or new secret keys. Maps key stays in env.
6. Trailing slashes are on; images are `unoptimized: true`.

## Deploy

- Prefer **Firebase App Hosting** (`backendId`: `church-website`, standalone output).
- Hosting `public: "out"` SPA block in `firebase.json` may be stale vs App Hosting.
- Deploy rules when changing access: `firestore.rules`, `storage.rules`.
- Clarify deploy target if `.firebaserc` and `lib/firebase.ts` project ids disagree.

## Out of scope unless asked

- Mishenah mobile/admin/finance/first-timers apps (sibling folders under `LEC/`)
