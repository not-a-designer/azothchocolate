# Azoth Chocolate

An editorial landing page for Azoth Chocolate's educational fine-chocolate tasting and beverage-pairing experiences.

![Chocolate paired with wine, beer, and coffee](public/images/azoth-hero.png)

## About

Azoth Chocolate collaborates with breweries, wineries, and coffee roasters to create guided tasting experiences around three programs:

- Cacao & Cup — coffee pairings
- Cacao & Craft — beer pairings
- Cacao & Vine — wine pairings

The site presents the programs, guest journey, hosting process, founder credentials, and an email-based venue inquiry call to action.

## Technology

- Angular 22
- TypeScript 6
- Angular SSR and prerendering
- SCSS with a shared semantic color system
- Vitest component tests
- Self-hosted Newsreader and Manrope variable fonts

## Local development

Install the pinned dependencies:

```bash
npm ci
```

Start the Angular development server:

```bash
npm start
```

Open [http://localhost:4200](http://localhost:4200). The page reloads automatically when source files change.

## Quality checks

Run the unit suite once:

```bash
npm test -- --watch=false
```

Create an optimized production build:

```bash
npm run build
```

The production artifacts are written to `dist/azoth`.

To run the built SSR application locally:

```bash
npm run serve:ssr:azoth
```

## Project structure

```text
public/
  images/                 Editorial photography
src/
  app/
    components/           Landing-page sections and shared icon component
    declarations/         Shared application interfaces
  assets/                 Azoth and pairing-program SVG artwork
  styles.scss             Global tokens, reset, typography, and utilities
```

## Content and branding

Azoth's logo artwork and the Cacao & Cup, Cacao & Craft, and Cacao & Vine program marks live in `src/assets`. Keep their proportions intact when placing them in new layouts.

The page uses fragment navigation and remains a single-page experience. Hosting inquiries open a pre-addressed email to `hello@azothchocolate.com`; there is no form backend.

## Deployment

The current Angular build supports prerendering and a Node SSR entry point. For a fully static host, change the Angular build `outputMode` to `static` before configuring the deployment provider. Set the canonical URL and absolute social-preview URL after the production domain is chosen.

## Rights

Copyright © 2026 Azoth Chocolate. All rights reserved.
