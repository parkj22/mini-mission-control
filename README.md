# mini-mission-control

Mission Control dashboard scaffolding for monitoring OpenClaw agents locally. Built with:

- Next.js (App Router)
- TypeScript
- Tailwind CSS (v4) with shadcn/ui components
- Socket-ready API surface (/api/status) for future real-time data

## Getting started

```bash
npm install
npm run dev
```

Visit <http://localhost:3000> to view the dashboard. The `/api/status` route currently serves mock data that can be replaced with live OpenClaw telemetry or a Socket.IO publisher in future steps.

## Project layout

```
/app         # App Router entry + API routes
/components  # UI building blocks (shadcn + dashboard widgets)
/lib         # Shared types + utilities
/server      # Backend logic (data fetching, adapters)
```
