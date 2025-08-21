# 10xChat

A modern chat interface application built with Astro, React, and Tailwind CSS, emulating the 10xChat experience with multi-threaded conversations and persistent chat history.

## ✨ Features

- **Multi-threaded Conversations**: Create and manage multiple chat threads
- **Persistent Chat History**: Chat data is saved locally and persists across sessions
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Chat Interface**: Smooth messaging experience with loading states
- **Auto-generated Titles**: Thread titles are automatically generated from the first message
- **Server-Side Rendering**: Fast initial page loads with SSR support

## 🚀 Project Structure

```text
/
├── public/                 # Static assets
│   └── favicon.svg
├── src/
│   ├── components/         # React components
│   │   ├── Avatar.tsx
│   │   ├── ChatInput.tsx
│   │   ├── ChatInterface.tsx
│   │   ├── ChatMessage.tsx
│   │   ├── ChatSidebar.tsx
│   │   ├── MobileHeader.tsx
│   │   └── ThreadItem.tsx
│   ├── hooks/              # Custom React hooks
│   │   └── useChatMigration.ts
│   ├── pages/              # Astro pages and API routes
│   │   ├── api/
│   │   │   └── chat.ts
│   │   └── index.astro
│   ├── stores/             # State management
│   │   └── chatStore.ts
│   └── styles/             # Global styles
│       └── global.css
├── astro.config.mjs        # Astro configuration
├── tsconfig.json           # TypeScript configuration
└── package.json
```

## 🛠️ Tech Stack

- **Framework**: Astro 5.x with React 19 integration
- **Styling**: Tailwind CSS 4.x
- **State Management**: Zustand with persist middleware
- **TypeScript**: Strict configuration
- **Deployment**: Cloudflare Pages (configured)
- **Icons**: Lucide React

## 🧞 Commands

All commands are run from the root of the project:

| Command           | Action                                    |
| :---------------- | :---------------------------------------- |
| `npm install`     | Installs dependencies                     |
| `npm run dev`     | Starts local dev server at `localhost:3000` |
| `npm run build`   | Build production site to `./dist/`       |
| `npm run preview` | Preview build locally before deploying   |
| `npm run astro`   | Run Astro CLI commands                    |

## 🏗️ Architecture

The application uses a client-side state management approach with Zustand for handling chat threads and messages. Each chat session is organized into threads, with messages persisted to localStorage for continuity across browser sessions.

### Key Components

- **ChatInterface**: Main chat container managing thread switching and message flow
- **ChatSidebar**: Navigation for switching between chat threads
- **ChatStore**: Zustand store handling thread and message state with localStorage persistence

### API Integration

The chat functionality integrates with a server-side API endpoint at `/api/chat` for processing user messages and generating responses.