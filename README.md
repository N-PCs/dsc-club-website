# DSC Club VITB

Official website for the Data Science Club at VIT Bhopal.

## Overview

This project is a modern React + TanStack Start site for the club's events, gallery, member highlights, and recruitment flow. It is built with TypeScript, Tailwind CSS, and a route-based architecture for a fast and polished experience.

## Tech Stack

- React 19
- TypeScript
- TanStack Router + Start
- Tailwind CSS
- Vite

## Local Development

Requirements:

- Node.js 22+
- npm

Install dependencies and start the app:

```bash
npm install
npm run dev
```

The app runs locally in development mode with Vite and TanStack Start.

## Production Build

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## Linting

```bash
npm run lint
```

## Vercel Deployment

This project is set up for standard Vercel deployment using the TanStack Start + Vite build pipeline.

### Recommended deployment steps

1. Push this repository to GitHub.
2. Import the repo in Vercel.
3. Keep the default framework settings or select the Vite project type.
4. Set the Node version to 22.x in the Vercel project settings if needed.
5. Deploy.

Vercel will run the standard install + build flow from the project scripts, so no special deployment configuration is required.

## Project Structure

```text
src/
  components/     UI and page components
  routes/         Route pages
  lib/            helper utilities
  assets/         images and static assets
public/           static public assets
vite.config.ts   Vite and TanStack Start config
package.json      project scripts and dependencies
```

## Notes

- The app preserves custom routing and styling while keeping the project self-contained.
- Styling is handled with Tailwind and a shared design system component layer.
- Build verification is part of the project workflow before shipping changes.
