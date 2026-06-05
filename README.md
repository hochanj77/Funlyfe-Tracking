# FleetTrack

A clean, modern, mobile-first web app for transportation companies to manage their drivers.

## Features

- **Live Map** — Track driver locations and assigned routes
- **Attendance** — Daily check-in/check-out with status overview
- **Team Directory** — Searchable driver list with contact info
- **Messaging** — Team chat and direct messages

## Tech Stack

- [TanStack Start](https://tanstack.com/start) — Full-stack React framework
- [TanStack Router](https://tanstack.com/router) — Type-safe routing
- [TanStack Query](https://tanstack.com/query) — Server state management
- [Tailwind CSS v4](https://tailwindcss.com) — Utility-first styling
- [Vite](https://vitejs.dev) — Build tooling

## Getting Started

```bash
# Install dependencies
bun install

# Start development server
bun run dev

# Build for production
bun run build
```

## Project Structure

```
src/
  components/fleet/    # FleetTrack UI tabs (Map, Attendance, Team, Messages)
  lib/mock-data.ts     # Mock driver and conversation data
  routes/              # TanStack Start file-based routes
  styles.css           # Tailwind CSS entry + theme tokens
```

## Notes

This is a UI prototype with mock data. No real backend, authentication, or database is wired up.
