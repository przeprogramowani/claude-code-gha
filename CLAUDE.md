# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Astro application emulating ChatGPT 10, built with React and Tailwind CSS. The project uses Astro's server-side rendering (SSR) mode and runs on port 3000 in development.

## Development Commands

All commands should be run from the project root:

- `npm install` - Install dependencies
- `npm run dev` - Start development server at `localhost:3000`
- `npm run build` - Build production site to `./dist/`
- `npm run preview` - Preview production build locally
- `npm run astro check` - Run Astro's built-in type checking and linting

## Architecture

### Tech Stack
- **Framework**: Astro 5.x with React integration
- **Styling**: Tailwind CSS 4.x (via Vite plugin)
- **TypeScript**: Strict configuration extending Astro's recommended settings
- **Build**: Vite-based build system with SSR output mode

### Key Configuration
- Server mode enabled (`output: "server"`)
- Development server runs on port 3000
- Astro dev toolbar is disabled
- React JSX transform configured for optimal performance

### Directory Structure
- `src/pages/` - File-based routing (`.astro` and `.md` files)
- `src/styles/` - Global styles and Tailwind imports
- `public/` - Static assets served directly
- `dist/` - Production build output (excluded from TypeScript compilation)

### Development Notes
- The project uses Astro's strict TypeScript configuration
- React components should use the modern JSX transform
- Tailwind CSS is integrated via Vite plugin for optimal performance
- Pages are server-rendered by default due to the SSR output configuration