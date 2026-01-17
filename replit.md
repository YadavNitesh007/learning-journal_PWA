# Learning Journal PWA with Call Break Card Game

## Overview

A Progressive Web Application (PWA) serving as a personal learning journal for a Mobile Application Development course. The app tracks weekly learning reflections, showcases projects, and includes a Call Break card game as a mini-project. Built with React, TypeScript, and Express.js, it demonstrates PWA capabilities including offline support, installability, and responsive design.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Routing**: Wouter for lightweight client-side routing with pages for Home, Journal, Projects, About, and Game
- **State Management**: TanStack Query for server state and data fetching
- **Styling**: TailwindCSS with shadcn/ui component library (New York style variant)
- **Theme System**: Custom ThemeProvider supporting light/dark mode with localStorage persistence

### Backend Architecture
- **Server**: Express.js with TypeScript running on Node.js
- **API Pattern**: RESTful endpoints under `/api/` prefix for reflections and projects CRUD operations
- **Storage**: Currently uses in-memory storage (`MemStorage` class) with interface designed for easy database migration
- **Development**: Vite dev server with HMR integrated via middleware

### PWA Implementation
- **Service Worker**: Custom service worker (`sw.js`) with cache-first strategy for static assets and network-first for API calls
- **Manifest**: Web app manifest for installability with proper icons and theme colors
- **Offline Support**: Cached API responses serve as fallback when offline

### Database Schema (Drizzle ORM)
- **reflections**: Stores journal entries with id, name, date, reflection text, and week number
- **projects**: Stores project showcases with title, description, technologies array, and URLs
- Schema defined in `shared/schema.ts` using Drizzle with PostgreSQL dialect configured

### Build System
- **Development**: `tsx` runs TypeScript directly for the server, Vite handles client HMR
- **Production**: Custom build script bundles server with esbuild (selective dependency bundling) and client with Vite

## External Dependencies

### Database
- **Drizzle ORM**: SQL toolkit configured for PostgreSQL
- **PostgreSQL**: Database connection via `DATABASE_URL` environment variable (required for production)
- **connect-pg-simple**: Session storage for PostgreSQL (available but not currently active)

### UI Component Libraries
- **Radix UI**: Comprehensive set of accessible, unstyled primitives
- **shadcn/ui**: Pre-styled components built on Radix UI
- **Lucide React**: Icon library
- **react-icons**: Additional icon sets (GitHub, LinkedIn)

### Form & Validation
- **React Hook Form**: Form state management
- **Zod**: Schema validation with drizzle-zod integration
- **@hookform/resolvers**: Zod resolver for React Hook Form

### External APIs
- **@octokit/rest**: GitHub API client (available for GitHub integration features)

### Build & Development Tools
- **Vite**: Frontend build tool with React plugin
- **esbuild**: Server bundling
- **TailwindCSS**: Utility-first CSS with PostCSS/Autoprefixer