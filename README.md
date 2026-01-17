# Learning Journal PWA with Call Break Card Game

## FGCT6021 Mobile Application Development - Final Project

**Student:** Nitesh Kumar Yadav  
**Student ID:** 2313244

---

## Project Overview

This is a Progressive Web Application (PWA) that serves as a personal learning journal for the Mobile App Development course. The app includes weekly reflection tracking, project showcases, and a Call Break card game as a mini project demonstrating JavaScript game development skills.

## Features

### Main Application
- **Home Page** - Overview of the app with labs compliance information
- **Journal Page** - Submit and view weekly learning reflections
- **Projects Page** - Showcase of completed course projects
- **About Page** - Student profile and course timeline

### Call Break Card Game (Mini Project)
- Single-player vs 3 AI opponents
- Standard trick-taking gameplay with spades as trump
- Bidding system (1-8 tricks per round)
- 5-round scoring system

### PWA Capabilities
- Installable on mobile devices and desktop
- Offline support with service worker caching
- Responsive design for all screen sizes
- Light and dark theme toggle

## Technologies Used

- React with TypeScript
- Express.js backend
- TailwindCSS for styling
- shadcn/ui component library
- TanStack Query for data fetching
- Wouter for routing

## Labs Covered

| Lab | Topic | Implementation |
|-----|-------|----------------|
| Lab 2 | HTML/CSS Fundamentals | Responsive layouts, mobile-first design |
| Lab 3 | JavaScript & DOM | Theme switching, navigation, game logic |
| Lab 4 | Web APIs | LocalStorage, Fetch API |
| Lab 5 | JSON Data Handling | Reflections storage, API responses |
| Lab 6 | Backend Integration | Express.js routes, REST API |
| Lab 7 | PWA Features | Service worker, manifest, offline support |

## How to Run

```bash
npm install
npm run dev
```

The app runs on port 5000.

## Project Structure

```
client/src/
├── components/     # UI components (navigation, footer, cards)
├── lib/            # Game logic, theme provider, utilities
├── pages/          # Page components (home, journal, projects, about, game)
└── App.tsx         # Main app with routing

server/
├── routes.ts       # API endpoints
├── storage.ts      # Data storage
└── index.ts        # Server entry point

shared/
└── schema.ts       # Data models
```

## Call Break Game Rules

1. 4 players get 13 cards each
2. Each player bids how many tricks they will win (1-8)
3. Spades are always trump
4. Must follow suit if possible
5. Highest card of led suit wins (unless trumped)
6. Score = bid points if successful, -bid if failed
7. Game lasts 5 rounds
