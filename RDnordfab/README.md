# RD NORDFAB frontend

A Next.js App Router frontend prototype for RD NORDFAB AB. The page structure and visual system follow the screenshots supplied in the conversation: Nordic cream backgrounds, forest-green actions, premium product photography, slim borders, spacious layouts and the reference section order.

## Run locally (Ubuntu)

Requirements: Node.js 20.9+ (Node 22 recommended) and npm.

```bash
cd rd-nordfab-frontend
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000.

## Included in this first frontend build

- Homepage with announcement bar, navigation, hero, feature strip, featured products, nature collection, why-choose-us, custom-print teaser, how-it-works, categories, sustainability, reviews, newsletter and footer.
- Shop page with category, search, material and availability filters plus sorting.
- Product detail route at `/products/[slug]`.
- Custom-print request form UI with file selection and material/colour/project choices.
- Cart and wishlist persisted in browser local storage.
- About, contact, FAQ, shipping, returns, privacy, terms, cookies, blog and careers pages.
- Login, register, forgot-password and account UI.
- Admin dashboard visual prototype at `/admin`.
- Sample product catalogue and local WebP image assets.

## Demo data and backend status

The product catalogue and admin dashboard metrics are sample frontend data for visual development. Cart and wishlist actions work locally in the browser. Authentication, file upload persistence, order creation, checkout/payment processing, contact email, newsletter storage and admin CRUD are not connected to a backend yet. The API helper is prepared in `src/lib/api.ts`; set `NEXT_PUBLIC_API_URL` when the NestJS API is ready.

## Main project structure

```text
src/
  app/                 App Router pages
  components/          Shared layout, home, product and page components
  context/             Browser cart and wishlist state
  data/                Sample catalogue
  lib/                 API helper
public/images/         Product and banner imagery
```

## Useful routes

- `/` homepage
- `/shop` catalogue
- `/products/twisted-vase` sample product detail
- `/custom-print` quote request UI
- `/about` and `/contact`
- `/login`, `/register`, `/account`
- `/cart`, `/wishlist`, `/checkout`
- `/admin` admin dashboard prototype

The first build is the foundation. Compare it in your browser with the supplied screenshots, then we can tune visual proportions and implement each remaining page in detail before integrating the backend.
