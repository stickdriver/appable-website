# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a modern React TypeScript landing page for Appable, built with Vite. It's a single-page application with a hero carousel, services section, and contact form. The entire application is contained in a single component file (`src/App.tsx`) for simplicity.

## Development Commands

```bash
# Install dependencies
npm i

# Start development server (usually http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Architecture

- **Single-file approach**: The entire application is in `src/App.tsx` with all components inlined
- **No component separation**: All UI components (Hero, Services, Contact) are defined within App.tsx
- **Tailwind via CDN**: Uses Tailwind CSS loaded from CDN in `index.html` - no PostCSS build setup
- **React 18 + TypeScript**: Standard React setup with TypeScript and Vite
- **Minimal dependencies**: Only React, ReactDOM, and TypeScript/Vite dev dependencies

## Key Features & Implementation Notes

### Hero Carousel
- Auto-rotates every 7 seconds (configurable via `intervalTime` variable)
- Crossfade transitions between slides
- Keyboard navigation (←/→ arrows, Space to pause)
- Mouse hover pauses auto-rotation
- Background gradient animation with floating shapes
- Content-width constrained (max-w-7xl) rather than full-bleed

### Styling & CSS
- Uses Tailwind classes extensively
- Custom CSS animations defined inline via `<style>` tags within components
- Responsive design with mobile-first approach
- Supports `prefers-reduced-motion` for accessibility

### Testing
- Built-in smoke tests via `runSmokeTests()` function that run in the browser console
- Tests validate slide data structure and component function existence

## Customization Points

When modifying the hero carousel:
- Change `intervalTime` in Hero component to adjust auto-rotation speed
- Set `useState(true)` for paused state to disable auto-rotation by default
- Modify slide data in `getSlides()` function
- Background constraint classes: `left-1/2 ... max-w-7xl -translate-x-1/2` (change to `inset-0` for full-bleed)

## Contact Form
- Currently shows success state without backend integration
- Includes honeypot field for basic bot protection
- Form validation is client-side only
- Replace with Tally embed, Formspree, or custom API as needed

## File Structure
- `index.html`: Entry point, loads Tailwind CSS from CDN
- `src/main.tsx`: React app bootstrap
- `src/App.tsx`: Complete application (single-file architecture)
- `tsconfig.json`: TypeScript configuration
- `package.json`: Dependencies and scripts