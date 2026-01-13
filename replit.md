# Learning Journal PWA

## Overview

A Progressive Web Application for documenting weekly learning reflections, projects, and professional growth. The application serves as a personal learning journal with offline support, theme switching, and installability. Built with React frontend and Express backend, using in-memory storage with a PostgreSQL-ready schema.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript, using Vite as the build tool
- **Routing**: Wouter for client-side routing (lightweight alternative to React Router)
- **State Management**: TanStack React Query for server state and data fetching
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens, supporting light/dark themes via CSS variables
- **Forms**: React Hook Form with Zod validation

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **API Design**: RESTful endpoints under `/api/` prefix for reflections and projects
- **Data Validation**: Zod schemas shared between client and server via drizzle-zod
- **Storage**: Currently uses in-memory storage (MemStorage class) with interface designed for easy database migration

### PWA Features
- **Service Worker**: Caches static assets and API responses for offline functionality
- **Manifest**: Enables app installation on mobile and desktop devices
- **Offline Indicator**: Shows banner when network is unavailable

### Database Schema
- **reflections**: Stores journal entries with id, name, date, reflection text, and week number
- **projects**: Stores portfolio projects with title, description, technologies array, and URLs
- Schema defined using Drizzle ORM with PostgreSQL dialect (ready for database connection)

### Key Design Patterns
- **Monorepo Structure**: Client code in `/client`, server in `/server`, shared types in `/shared`
- **Path Aliases**: `@/` for client source, `@shared/` for shared code
- **Theme System**: Context-based theme provider with localStorage persistence
- **Component Architecture**: Reusable UI components in `/client/src/components/ui/`

## External Dependencies

### Database
- **Drizzle ORM**: Database toolkit with PostgreSQL dialect configured
- **PostgreSQL**: Expected database (requires DATABASE_URL environment variable for production)
- Currently running with in-memory storage for development

### Frontend Libraries
- **Radix UI**: Headless UI primitives for accessible components
- **TanStack Query**: Data fetching and caching
- **React Hook Form**: Form state management
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React / React Icons**: Icon libraries

### Development Tools
- **Vite**: Frontend build tool with HMR
- **esbuild**: Server bundling for production
- **TypeScript**: Type checking across the stack
- **Drizzle Kit**: Database migration tooling

### Fonts
- **Inter**: Primary body font (Google Fonts)
- **Space Grotesk**: Display/heading font (Google Fonts)

## Deployment to Render

### Quick Deploy Steps
1. Push your code to a GitHub repository
2. Go to [Render Dashboard](https://dashboard.render.com)
3. Click "New" → "Web Service"
4. Connect your GitHub repository
5. Configure the service:
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start`
   - **Environment Variables**: Add `SESSION_SECRET` (generate a random string)
6. Click "Create Web Service"

### Alternative: Blueprint Deploy
Use the `render.yaml` file for automatic configuration:
1. Push code to GitHub
2. In Render Dashboard, click "New" → "Blueprint"
3. Connect your repository
4. Render will auto-detect the render.yaml configuration

### Environment Variables for Render
- `NODE_ENV`: production (auto-set by Render)
- `SESSION_SECRET`: Required for session management (generate a secure random string)
- `PORT`: Auto-provided by Render

### Build Output
- Client: Built to `dist/public/` directory
- Server: Bundled to `dist/index.cjs`