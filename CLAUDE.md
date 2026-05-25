# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
yarn dev        # Development server (network-accessible via --host)
yarn build      # Production build
yarn lint       # ESLint
yarn preview    # Preview production build locally
```

No test suite is configured.

## Architecture

React 19 SPA built with Vite + TanStack Router + TanStack Query. Entry point is `src/main.jsx` → `src/routers/router.jsx`.

### Module structure

```
src/
  routers/           # Route definitions (router.jsx, krys.jsx, krys-secrets.jsx)
  modules/
    core/            # Shared infrastructure
    krystel/         # Main feature module (quotes/cards/posts app)
    pixi/            # PixiJS canvas rendering wrappers
    shadcn/          # Radix UI + Tailwind component library
```

**`modules/core`** — reusable infrastructure: custom hooks (`useSettings`, `useLocalStorage`, `useAsync`), context providers (TanStack Query, nuqs), service wrappers (Supabase, Umami, ntfy), helper utilities (dates, arrays, strings, Tailwind, colors), and the shared `DataLoader` component.

**`modules/krystel`** — the main feature: pages, feature components, hooks, actions (API calls), providers (auth, overlays, quote), services (quotes API), and helpers (themes, feelings, particle effects).

**`modules/shadcn`** — pre-built Radix UI + Tailwind components; treat as a vendored library.

**`modules/pixi`** — thin React wrappers (`Sprite`, `AnimatedSprite`, `NineSliceSprite`) around `@pixi/react`.

### Routing (TanStack Router v1)

Routes are defined with `createRoute()` in `src/routers/`. Key structure:

```
/              → redirects to NEXT_PUBLIC_TARGET (prod) or /krys (debug)
/krys          → main app (Outlet)
  /            → Card (single quote display)
  /login       → Login
  /cards       → Cards list
  /posts       → Posts
  /secrets     → Nested (Outlet)
    /cards     → Secret cards list
    /editor    → Quote editor
    /tools, /logs, /settings
/krystel       → Redirects to unavailable page
```

`beforeLoad()` hooks handle auth redirects. URL query state is managed via `nuqs`.

### State management

No global state store. State is layered:

1. **TanStack Query** — server state and caching. All data fetching goes through `DataLoader` (a wrapper component around `useQuery`) or directly via `useQuery`. Query keys follow patterns like `['cards']`, `['quotes']`.
2. **React Context** — `AuthProvider` (token + login redirect), `OverlaysProvider` (modals), `QuoteProvider`, `ToastProvider`. These are stacked in `KrystelProviders`.
3. **nuqs** — URL query params as state, synced with TanStack Router. Used for filter/display options (`code`, `skip-actions`, etc.).
4. **`useLocalStorage`** — persistent client state. Auth token stored under `'app:tracker'`; settings under `'settings:*'` keys accessed via `useSettings()`.

### Actions

API calls live in `modules/krystel/actions/` as standalone async functions (e.g., `createQuoteAction.js`, `deletePostAction.js`). These are called from hooks or components — not co-located with query definitions.

### Environment variables

Uses `NEXT_PUBLIC_` prefix convention (mimics Next.js) even though the build tool is Vite. Key vars:

- `NEXT_PUBLIC_DEBUG` — redirects `/` to `/krys` when `true`
- `NEXT_PUBLIC_TARGET` — external redirect URL for production root
- Supabase, Spotify, Weather, and Umami credentials (see `.env.example`)

### Path aliases

`@/` resolves to `./src/` (configured in both `vite.config.js` and `jsconfig.json`).

### Styling

Tailwind CSS 4.1 via `@tailwindcss/vite` plugin. Component variants use `class-variance-authority` + `tailwind-merge` + `tailwind-variants`. No CSS modules — global styles in `src/index.css` and `modules/core/css/`.

### Code conventions

- All filenames: kebab-case (`weather-widget.jsx`, `use-weather.js`)
- Exports: `export const` for everything; `export default` only in `app.jsx`
- No TypeScript, no JSDoc, no type annotations
- `useRef` variables use a `$` prefix (e.g. `$ref`)
- **CSS classes**: always use `cn()` from `@/helpers/utils.js` — pass variables directly and use objects for conditional classes; never build class strings via template literals or string concatenation

`CLAUDE.md` and `AGENTS.md` are kept in sync — they contain the same information, one tailored for Claude Code and the other for other AI assistants. Whenever you update `CLAUDE.md`, apply the same changes to `AGENTS.md` (and vice versa). The only intentional differences between the two files are: the title, the intro line, and the self-reference in this table (`CLAUDE.md` vs `AGENTS.md`).

### Key patterns

- **Icon sizing**: use Tailwind class `[&>svg]:size-X` on the container, never the `size` prop on Lucide icons.
- **Square sizing**: when `w-X` and `h-X` have the same value, always use `size-X` instead (e.g. `w-4 h-4` → `size-4`, `w-full h-full` → `size-full`). Only exception: conditional orientation classes like `data-horizontal:w-full data-vertical:h-full`.
- **Units**: prefer `rem` over `px` wherever possible — in inline styles, CSS custom properties, and any raw CSS. Use `px` only for values that must not scale (e.g. 1px borders).
- **Tailwind scale**: always use Tailwind's built-in scale values instead of arbitrary bracket values. Tailwind's spacing scale is `1 = 0.25rem = 4px`, so `size-4` = 16px, `size-4.5` = 18px, `size-6` = 24px, etc. Only fall back to `size-[X]` when the value genuinely has no equivalent on the scale.
- **Dynamic Tailwind values**: Tailwind can't generate classes from runtime values, so pass them as CSS custom properties via `style` and reference them with Tailwind's variable syntax. Example: `<div className="w-(--panel-width)" style={{ '--panel-width': '22.5rem' }} />`. Use kebab-case for the variable name and set it on the element (or a parent) that needs it.
