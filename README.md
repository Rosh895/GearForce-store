# GearForce Store

Premium motorcycle riding-gear storefront for **GearForce, Hyderabad** — Next.js (App Router) · TypeScript · Tailwind CSS v4 · Motion · Lucide. Local typed catalogue, client-side cart, Vercel-ready.

> **Status:** browsing, search, filters, product pages and the local cart work. **Checkout and payments do not** — see [What works / what doesn't](#what-works--what-doesnt).

## Quick start

Requires **Node.js ≥ 22.12** (22 LTS).

```bash
npm install
cp .env.example .env.local   # optional for local dev
npm run dev                  # http://localhost:3000
```

Quality gates:

```bash
npm run typecheck            # tsc --noEmit
npm test                     # vitest: catalogue, filters, cart
npm run catalogue:report     # prints unresolved migration data
npm run build && npm start   # production build
npm run check                # typecheck + test + build
```

## Architecture

```
src/
  app/            routes (home, shop, category/[slug], product/[slug], cart, checkout, about, contact, faq, policies, api/checkout, sitemap, robots)
  components/     layout/ home/ product/ cart/ ui/
  data/           source-catalogue.ts (SOURCE OF TRUTH), categories, business, confirmed-names
  lib/            catalogue (source → derived Product), products (server data layer), filter, cart, validation, format, checkout seam
  hooks/          use-cart (context + localStorage)
  types/          product.ts (schema)
tests/            expected-catalogue.ts is a *second, independent* copy of the Wix tables used to cross-check the source
```

- **Source vs derived.** `src/data/source-catalogue.ts` holds the 48 Wix rows exactly as supplied (`null` = unknown). `lib/catalogue.ts` derives slugs, ids, display names and flags. Nothing unknown is invented.
- **Data layer.** Components only call `lib/products.ts`. To move to a database, replace the bodies of those functions.
- **Slugs** are `<visible-name-fragment>-<sku>` and are pinned to the *original* fragment, so confirming a full name later does not change URLs. The SKU-less product uses `-sku-unverified`.
- **Cart** stores only `{productId, quantity}` in `localStorage`; prices and availability are re-derived from the live catalogue on every render. It is a shopping convenience, not stock management.
- **Images.** No product photos were supplied, so cards show an honest "Photo coming soon" placeholder. Drop real photos in `public/products/<sku-lowercase>/1.jpg` (SKU-less product: `public/products/<slug>/`); they are picked up automatically at build time.

## Catalogue notes

- 48 entries; the Wix placeholder `0001 "I'm a Product"` is kept in the audit but `publishStatus: hidden_pending_confirmation` — **47 are published**.
- **22 names are truncated in Wix** (e.g. "Rynox Tornado P…"). They are shown as the visible fragment with "…" and "Full product name is being confirmed". Put confirmed names in `src/data/confirmed-names.ts` keyed by SKU.
- Tarmac One III's SKU is `null` ("SKU TO VERIFY"). It is never guessed.
- Brands are only set when the brand is literally the first words of the visible name (GoPro, 66BHP, AllExtreme, Autofy, Rynox, Tarmac, Royal Enfield, XDI). "Himalayan…" is a model name, so those have no brand ("Brand not specified" filter).
- Variant counts are shown as supplied; **no sizes/colours or per-variant stock exist** in the data. Product pages say so and ask customers to contact GearForce.
- "Featured" products on the homepage are an editorial choice (`featured: true` in the source file), not a Wix fact.
- The "Lighting & Protection" group (FL01–FL02) is its own category, reachable from the shop filters and footer.

## What works / what doesn't

| Works now | Needs external integration |
|---|---|
| Responsive storefront, mobile nav, search | Payment gateway (Razorpay) |
| Category/brand/price/availability filters, sort, "show more" | Order persistence & order history |
| 47 product pages, structured data, sitemap, robots | Server-side stock + price validation |
| Cart: add/remove/qty/subtotal, localStorage, out-of-stock handling | Real product photos, hero photo |
| Honest "checkout unavailable" page and 503 API | Variant data (sizes/colours) & per-variant stock |
| Draft policy pages, FAQ, About, Contact | Owner-approved policies, contact details, social links |
| Catalogue validation tests | Admin login, shipping addresses, notifications, discounts |

`POST /api/checkout` returns **503** until a provider is configured. `src/lib/checkout.ts` defines the `PaymentProvider` seam.

## Replacing temporary assets

- **Logo:** derived from the supplied raster (`public/logo/gearforce-logo-source.webp`). `gearforce-logo.png` (full lockup), `gearforce-mark.png` (compact GF monogram), `src/app/icon.png` / `apple-icon.png` (favicon) and `src/app/opengraph-image.png` are crops of it. It has a near-black background and is blended into the dark header with `mix-blend-mode: lighten`. **Request a vector/transparent logo** and swap these files.
- **Hero:** until a licensed motorcycle photograph is placed at `public/images/hero.jpg` (or `.webp`/`.avif`), the hero uses a brand graphic. Do not use F1/Batman or other protected imagery.

## GitHub

```bash
git init -b main
git add .
git commit -m "Initial GearForce storefront"
# create an empty repo named gearforce-store on GitHub (private is fine), then:
git remote add origin git@github.com:<your-user>/gearforce-store.git
git push -u origin main
```

With the GitHub CLI: `gh repo create gearforce-store --private --source=. --push`.
GitHub Actions (`.github/workflows/ci.yml`) runs typecheck, tests and build on every push/PR.

## Vercel

1. Vercel dashboard → **Add New… → Project** → import `gearforce-store` (framework auto-detected as Next.js; no build overrides).
2. Add environment variables (below) → **Deploy**.
3. Every push to `main` deploys to production; every PR/branch gets a preview URL automatically.
4. **Custom domain later:** Project → Settings → Domains → add the domain, set the DNS records Vercel shows, then set `NEXT_PUBLIC_SITE_URL=https://your-domain` and redeploy (this enables canonical URLs, sitemap and absolute Open Graph URLs).

## Environment variables

See `.env.example`. None are required to run.

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Final public origin; enables canonicals/sitemap |
| `NEXT_PUBLIC_CONTACT_EMAIL` / `_PHONE` / `_ADDRESS` | Shown on Contact + footer when set |
| `RAZORPAY_KEY_ID` / `RAZORPAY_KEY_SECRET` | Reserved for future server-side payments. Never prefix with `NEXT_PUBLIC_`; never commit. |

## Missing business information (checklist)

- [ ] Phone, email, shop address, opening hours, social accounts
- [ ] Owner-approved Shipping, Return & Refund, Privacy and Terms text (currently drafts)
- [ ] Whether shipping/returns/warranty are offered (nothing is promised on the site)
- [ ] Full names for the 22 truncated products; SKU for Tarmac One III
- [ ] Decision on placeholder `0001` (delete in Wix, or confirm)
- [ ] Product photos, descriptions, verified specifications, brands
- [ ] Variant lists (sizes/colours) and per-variant stock — and original prices where applicable
- [ ] Licensed hero photograph; vector/transparent logo
- [ ] Final domain

## Recommended migration plan from Wix

1. Export the Wix catalogue as CSV (Products → Export). Diff it against `source-catalogue.ts`; resolve the checklist above.
2. Move products, variants and stock into Postgres (e.g. Neon/Supabase via Vercel Marketplace) behind `lib/products.ts`; keep `tests/expected-catalogue.ts` as a regression check on the import.
3. Add admin auth and inventory editing; store images in Vercel Blob/S3 and replace the filesystem image lookup.
4. Add shipping-address capture, Razorpay order creation + webhook, server-side price/stock validation, order table and notification emails. Only then enable checkout.
5. Run Wix and GearForce in parallel, then switch the domain and add 301 redirects from old Wix URLs.

Do not use GitHub as an order or inventory database.
