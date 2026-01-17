# Learning Journal PWA with Call Break Card Game

## Overview

A comprehensive Learning Journal Progressive Web App for the FGCT6021 Mobile App Development course, now featuring a Call Break card game as a mini project. The app demonstrates all course lab requirements (Labs 2-7) with professional UI/UX design.

**Student:** Nitesh Kumar Yadav  
**Student ID:** 2313244

## Application Features

### Learning Journal (Main App)
- **Home Page:** Labs compliance showcase, feature cards, quick links
- **Journal Page:** Weekly reflections with search, filter, and stats dashboard
- **Projects Page:** Technical project showcase with gradient cards
- **About Page:** Student profile, timeline, and course information

### Call Break Card Game (Mini Project)
- **Location:** `/game` route
- **Type:** Single-player vs 3 AI opponents
- **Features:** Full trick-taking gameplay, bidding system, 5-round scoring

## Call Break Game Rules

1. **Players:** 4 players (1 human + 3 AI bots)
2. **Cards:** Standard 52-card deck, each player gets 13 cards
3. **Trump:** Spades are always trump
4. **Bidding:** Each player bids 1-8 tricks they expect to win
5. **Playing:** 
   - Must follow suit if possible
   - If can't follow suit, can play any card (including trump)
   - Highest card of led suit wins, unless trumped
6. **Scoring:**
   - Meet or exceed bid: +bid points + 0.1 per overtrick
   - Fail to meet bid: -bid points
7. **Game:** 5 rounds total, highest score wins

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript, using Vite as build tool
- **Routing**: Wouter for client-side routing
- **State Management**: React Query for server state, useState for local state
- **UI Components**: shadcn/ui component library built on Radix UI
- **Styling**: Tailwind CSS with custom warm violet theme

### Key Files
- **Game Types**: `/client/src/lib/callbreak-types.ts`
- **Game Logic**: `/client/src/lib/callbreak-game.ts`
- **Card Component**: `/client/src/components/playing-card.tsx`
- **Game Page**: `/client/src/pages/game.tsx`

### PWA Features
- Service Worker for offline caching
- Web App Manifest for installation
- Responsive design for all devices
- Online/offline status indicator

## Development

### Running the Project
```bash
npm run dev
```

### Build for Production
```bash
npm run build
npm run start
```

## Project Structure

```
client/
├── src/
│   ├── components/
│   │   ├── navigation.tsx      # Main navigation with Game link
│   │   ├── footer.tsx          # Footer with student info
│   │   ├── playing-card.tsx    # Card game component
│   │   └── ui/                 # shadcn components
│   ├── lib/
│   │   ├── callbreak-types.ts  # Game type definitions
│   │   ├── callbreak-game.ts   # Game logic engine
│   │   └── theme-provider.tsx  # Theme support
│   ├── pages/
│   │   ├── home.tsx            # Home with labs showcase
│   │   ├── journal.tsx         # Journal entries
│   │   ├── projects.tsx        # Project portfolio
│   │   ├── about.tsx           # About page
│   │   └── game.tsx            # Call Break card game
│   └── App.tsx                 # App entry with routing
server/
└── index.ts                    # Express server
```

## Labs Compliance

- **Lab 2:** HTML5, CSS3, responsive mobile-first design
- **Lab 3:** JavaScript interactivity, DOM manipulation
- **Lab 4:** Web APIs, LocalStorage, Fetch API
- **Lab 5:** JSON data handling, CRUD operations
- **Lab 6:** Express.js backend, RESTful API
- **Lab 7:** PWA features, Service Worker, offline support
