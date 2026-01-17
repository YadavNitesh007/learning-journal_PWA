# Call Break Card Game

## Overview

A single-player Call Break card game where you play against 3 AI opponents. Call Break is a popular trick-taking card game similar to Spades, where Spades are always trump.

**Student:** Nitesh Kumar Yadav  
**Student ID:** 2313244  
**Project Type:** Mini Project

## Game Rules

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
- **Framework**: React with TypeScript, using Vite as the build tool
- **Routing**: Wouter for client-side routing
- **State Management**: React useState/useEffect for game state
- **UI Components**: shadcn/ui component library built on Radix UI
- **Styling**: Tailwind CSS with custom card game theme

### Game Logic
- **Types**: `/client/src/lib/callbreak-types.ts` - Card, Player, GameState types
- **Game Engine**: `/client/src/lib/callbreak-game.ts` - All game logic
  - Deck creation and shuffling
  - Card dealing
  - Bidding system
  - Trick resolution
  - AI opponent logic
  - Scoring calculations

### Key Components
- **PlayingCard**: `/client/src/components/playing-card.tsx` - Card visual component
- **GamePage**: `/client/src/pages/game.tsx` - Main game interface

### AI Strategy
- Bids based on high cards and trump cards in hand
- Plays winning cards when possible
- Throws lowest cards when can't win

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
│   │   ├── playing-card.tsx    # Card component
│   │   └── ui/                 # shadcn components
│   ├── lib/
│   │   ├── callbreak-types.ts  # Type definitions
│   │   ├── callbreak-game.ts   # Game logic
│   │   └── theme-provider.tsx  # Theme support
│   ├── pages/
│   │   └── game.tsx            # Main game page
│   └── App.tsx                 # App entry
server/
└── index.ts                    # Express server
```

## Features

- Full Call Break gameplay
- 3 AI opponents with basic strategy
- 5-round game with scoring
- Responsive design for mobile and desktop
- Light/dark theme support
- Visual card animations
- Real-time game state updates
