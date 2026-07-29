# TEDx Panteion University — Sensorium

This repository contains the mobile-first web app created for TEDxPanteionUniversity 2026 by Λιν Χονγκ Τσε (Κιτ) (Github: https://github.com/Kit432).

The event theme was **Sensorium**. The app served as an event-day companion with:

- An interactive Sensorium drawing game
- The event schedule and live session indicator
- Speaker and performance information
- Workshop details and registration links
- Event, team, and social information
- A ticket-style venue and transportation screen

## Archived status

The 2026 Sensorium event has ended, and this project is now archived. The repository is retained as a record of the event and as a reference for future TEDx Panteion University teams.

No active development or content updates are expected unless the project is reused for a future event.

## Prerequisites

- Node.js 20 or later
- [pnpm](https://pnpm.io/)

This project uses pnpm. Do not use npm or yarn, as the committed lockfile is `pnpm-lock.yaml`.

## Local development

Install dependencies:

```bash
pnpm install
```

Start the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available commands

```bash
pnpm dev
pnpm lint
pnpm build
pnpm start
```

- `pnpm dev` starts the local development server.
- `pnpm lint` runs ESLint.
- `pnpm build` creates a production build.
- `pnpm start` serves the production build after `pnpm build`.

## Deployment

The app is deployed on Vercel:

- Production app: [https://tedxpu-app.vercel.app](https://tedxpu-app.vercel.app)
- Vercel team: [https://vercel.com/tedxpanteiouniversity](https://vercel.com/tedxpanteiouniversity)

Deployments are managed through the TEDxPanteionUniversity Vercel account. Login through their Google account.
