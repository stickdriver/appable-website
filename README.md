# Appable Landing Page

A minimal Vite + React (TypeScript) project containing the latest Appable landing page.

## Quick start

```bash
npm i
npm run dev
# open the local URL Vite prints (usually http://localhost:5173)
```

Tailwind is loaded **via CDN**, so there’s no PostCSS/Tailwind build setup needed.

## What’s included

- **Hero carousel** (auto-rotate ~7s, crossfade, Pause/Play, dots, ←/→ keys, Space to pause)
- **Background** constrained to **max-w-7xl** (no full-bleed on ultra-wide)
- **A11y**: semantic landmarks, skip link, labeled controls, reduced motion support
- **Services** cards
- **Contact** form with labels + success state (no backend yet)

## Files

- `index.html` – brings in Tailwind via CDN and mounts React

- `src/main.tsx` – app bootstrap

- `src/App.tsx` – the full page (single file)

## Common tweaks

- **Change slide timing**: in `App.tsx`, set `intervalTime` in the `Hero` to your preferred ms.

- **Disable auto-rotate**: set `const [paused, setPaused] = useState(true)` in the `Hero`.

- **Make hero full-bleed again**: change the background wrapper classes from `left-1/2 ... max-w-7xl -translate-x-1/2` to `inset-0`.

- **Form backend**: swap the current form with a Tally embed, Formspree, or your API.


## Troubleshooting

- If you see a blank page, check the browser console. The included smoke tests will log hints.
- If Tailwind classes don’t apply, ensure you’re online (CDN) or switch to a local Tailwind build.

## License

