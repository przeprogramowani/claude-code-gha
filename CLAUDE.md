# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Astro application emulating 10xChat, built with React and Tailwind CSS. The project uses Astro's server-side rendering (SSR) mode with Cloudflare adapter and runs on port 3000 in development.

## Development Commands

All commands should be run from the project root:

- `npm install` - Install dependencies
- `npm run dev` - Start development server at `localhost:3000`
- `npm run build` - Build production site to `./dist/`
- `npm run preview` - Preview production build locally
- `npm run astro` - Run Astro CLI commands

## Architecture

### Tech Stack
- **Framework**: Astro 5.x with React 19 integration
- **Styling**: Tailwind CSS 4.x (via Vite plugin)
- **State Management**: Zustand with persist middleware
- **TypeScript**: Strict configuration extending Astro's recommended settings
- **Build**: Vite-based build system with SSR output mode
- **Deployment**: Cloudflare adapter configured

### Key Configuration
- Server mode enabled (`output: "server"`) with Cloudflare adapter
- Development server runs on port 3000
- Astro dev toolbar is disabled
- React JSX transform configured for optimal performance
- TypeScript strict mode with React JSX configuration

### Application Architecture

#### Chat System
The application implements a multi-threaded chat interface with:

- **Thread Management**: Each chat conversation is a separate thread with unique ID, title, and message history
- **State Persistence**: Chat history persisted to localStorage with proper serialization/deserialization of Date objects
- **Real-time UI**: Responsive design with mobile sidebar navigation
- **API Integration**: Server-side chat API endpoint at `/api/chat.ts`

#### State Management (`src/stores/chatStore.ts`)
Uses Zustand with persist middleware for:
- Thread creation, switching, and deletion
- Message management within threads
- Auto-title generation from first user message
- Hydration state tracking for SSR compatibility

#### Component Structure
- `ChatInterface.tsx` - Main chat container with thread management
- `ChatSidebar.tsx` - Thread navigation sidebar
- `ChatMessage.tsx` - Individual message display
- `ChatInput.tsx` - Message input component
- `MobileHeader.tsx` - Mobile navigation header
- `Avatar.tsx` - User/AI avatar display
- `ThreadItem.tsx` - Individual thread item in sidebar

#### Data Models
```typescript
interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  threadId: string;
}

interface Thread {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}
```

### Development Notes
- The project uses Astro's strict TypeScript configuration
- React components use the modern JSX transform
- Tailwind CSS is integrated via Vite plugin for optimal performance
- All pages are server-rendered by default due to SSR output configuration
- State hydration is handled carefully to prevent SSR/client mismatches
- Chat migration hook (`useChatMigration.ts`) handles data migration between versions