# Learning Journal PWA

A Progressive Web Application for documenting weekly learning reflections, projects, and professional growth throughout the FGCT6021 Mobile Application Development course.

## Overview

This Learning Journal PWA combines knowledge from Labs 2-7:
- **Lab 2**: Frontend fundamentals - HTML/CSS, mobile-first responsive design
- **Lab 3**: JavaScript & DOM manipulation - reusable navigation, theme switching
- **Lab 4**: Web APIs - Storage API (localStorage for theme), Browser APIs
- **Lab 5**: Python & JSON - JSON-based data storage for reflections
- **Lab 6**: Frontend & Backend integration - API routes, dynamic data fetching
- **Lab 7**: PWA technologies - manifest, service worker, offline support, caching

## Features

- **4 Pages**: Home, Journal, Projects, About
- **Journal Entries**: Submit and view weekly reflections with form validation
- **Theme Toggle**: Light/dark mode with localStorage persistence
- **Offline Support**: Service worker with caching strategies
- **Installable**: PWA manifest for app installation on desktop/mobile
- **Responsive Design**: Mobile-first approach with breakpoints for tablet/desktop

## Project Structure

```
client/
├── public/
│   ├── manifest.json      # PWA manifest
│   ├── sw.js              # Service worker
│   └── favicon.png
├── src/
│   ├── components/
│   │   ├── navigation.tsx # Reusable navigation with theme toggle
│   │   ├── footer.tsx     # Footer with install prompt
│   │   └── ui/            # shadcn/ui components
│   ├── lib/
│   │   ├── theme-provider.tsx # Theme context with localStorage
│   │   ├── queryClient.ts
│   │   └── utils.ts
│   ├── pages/
│   │   ├── home.tsx       # Homepage with hero section
│   │   ├── journal.tsx    # Journal entries form and list
│   │   ├── projects.tsx   # Project showcase cards
│   │   └── about.tsx      # About page with profile and timeline
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
└── index.html

server/
├── index.ts
├── routes.ts              # API endpoints for reflections/projects
├── storage.ts             # In-memory storage implementation
├── static.ts
└── vite.ts

shared/
└── schema.ts              # Data models (Reflection, Project)
```

## API Endpoints

### Reflections
- `GET /api/reflections` - Get all reflections (sorted by date, newest first)
- `POST /api/reflections` - Create new reflection
- `DELETE /api/reflections/:id` - Delete a reflection

### Projects
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create new project
- `DELETE /api/projects/:id` - Delete a project

## Technologies

- **Frontend**: React, TypeScript, TailwindCSS, shadcn/ui
- **Backend**: Express.js, Node.js
- **State Management**: TanStack Query (React Query)
- **Routing**: Wouter
- **Forms**: React Hook Form with Zod validation
- **PWA**: Service Worker, Web App Manifest, Cache Storage API

## Development

The application runs on port 5000. The Express server serves both the API and the Vite-built frontend.

```bash
npm run dev
```

## PWA Features

- **Manifest**: Configures app name, icons, theme colors, and display mode
- **Service Worker**: Implements caching strategies for static assets and API responses
- **Offline Support**: Falls back to cached data when offline
- **Install Prompt**: Shows install button when PWA is installable
- **Offline Indicator**: Banner appears when connection is lost
