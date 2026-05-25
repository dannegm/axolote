# agents.md

This file provides context to AI coding assistants working in this repository.

## Commands

```bash
yarn dev        # Development server (network-accessible via --host)
yarn build      # Production build
yarn lint       # ESLint
yarn preview    # Preview production build locally
```

No test suite is configured.

## Stack

React 19 SPA · Vite 7 · TanStack Router v1 · TanStack Query v5 · Tailwind CSS 4

Entry point: `src/main.jsx` → `src/routers/router.jsx`

## Module structure

```
src/
  routers/           # Route definitions
  modules/
    core/            # Shared infrastructure (hooks, providers, services, helpers)
    krystel/         # Main feature (quotes, cards, posts)
    pixi/            # PixiJS canvas rendering wrappers
    shadcn/          # Radix UI + Tailwind component library (treat as vendored)
```

**`modules/core`** — reusable across features: custom hooks (`useSettings`, `useLocalStorage`, `useAsync`), context providers (TanStack Query, nuqs), service wrappers (Supabase, Umami, ntfy), utility helpers (dates, arrays, strings, colors), and the shared `DataLoader` component.

**`modules/krystel`** — the main feature module. Contains pages, components, hooks, actions (API calls), providers (auth, overlays, quote state), services (quotes API layer), and helpers (themes, feelings, particle effects).

**`modules/shadcn`** — pre-built Radix UI + Tailwind components. Do not refactor internals.

**`modules/pixi`** — thin React wrappers (`Sprite`, `AnimatedSprite`, `NineSliceSprite`) around `@pixi/react`.

## Routing

Routes are defined with `createRoute()` in `src/routers/`. Route tree:

```
/              → redirects to NEXT_PUBLIC_TARGET (prod) or /krys (debug)
/krys          → main app layout (Outlet)
  /            → Card (single quote display)
  /login       → Login form
  /cards       → Cards list
  /posts       → Posts page
  /secrets     → Nested layout (Outlet)
    /cards     → Secret cards list
    /editor    → Quote editor
    /tools, /logs, /settings
/krystel       → Redirects to unavailable page
```

Auth redirects use `beforeLoad()` hooks. URL query state is managed with `nuqs`, synced to TanStack Router.

## State management

No global store. State is layered by concern:

| Layer | Tool | Purpose |
|---|---|---|
| Server state | TanStack Query | Fetching, caching, refetching. Keys: `['cards']`, `['quotes']` |
| UI/feature state | React Context | Auth, overlays, toast, quote state — stacked in `KrystelProviders` |
| URL state | nuqs | Query params as state (`code`, `skip-actions`, etc.) |
| Persistent state | `useLocalStorage` | Auth token (`'app:tracker'`), settings (`'settings:*'`) |

Data fetching goes through the `DataLoader` component (wraps `useQuery`) or `useQuery` directly.

## Actions

API calls live in `modules/krystel/actions/` as standalone async functions (e.g., `createQuoteAction.js`, `deletePostAction.js`). They are imported by hooks or components — not co-located with query definitions.

## Environment variables

Uses `NEXT_PUBLIC_` prefix (mimics Next.js convention) even though the build tool is Vite.

- `NEXT_PUBLIC_DEBUG` — when `true`, root `/` redirects to `/krys` instead of the external target
- `NEXT_PUBLIC_TARGET` — external redirect URL used in production
- Supabase, Spotify, Weather, and Umami credentials — see `.env.example`

## Path aliases

`@/` → `./src/` (configured in `vite.config.js` and `jsconfig.json`).

## Styling

Tailwind CSS 4.1 loaded via `@tailwindcss/vite`. Component variants use `class-variance-authority` + `tailwind-merge` + `tailwind-variants`. No CSS modules — global styles live in `src/index.css` and `modules/core/css/`.

### Code conventions

- All filenames: kebab-case (`weather-widget.jsx`, `use-weather.js`)
- Exports: `export const` for everything; `export default` only in `app.jsx`
- No TypeScript, no JSDoc, no type annotations
- `useRef` variables use a `$` prefix (e.g. `$ref`)
- **CSS classes**: always use `cn()` from `@/helpers/utils.js` — pass variables directly and use objects for conditional classes; never build class strings via template literals or string concatenation

`AGENTS.md` and `CLAUDE.md` are kept in sync — they contain the same information, one for AI-agnostic assistants and the other tailored for Claude Code. Whenever you update `AGENTS.md`, apply the same changes to `CLAUDE.md` (and vice versa). The only intentional differences between the two files are: the title, the intro line, and the self-reference in this table (`AGENTS.md` vs `CLAUDE.md`).

### Key patterns

- **Icon sizing**: use Tailwind class `[&>svg]:size-X` on the container, never the `size` prop on Lucide icons.
- **Square sizing**: when `w-X` and `h-X` have the same value, always use `size-X` instead (e.g. `w-4 h-4` → `size-4`, `w-full h-full` → `size-full`). Only exception: conditional orientation classes like `data-horizontal:w-full data-vertical:h-full`.
- **Units**: prefer `rem` over `px` wherever possible — in inline styles, CSS custom properties, and any raw CSS. Use `px` only for values that must not scale (e.g. 1px borders).
- **Tailwind scale**: always use Tailwind's built-in scale values instead of arbitrary bracket values. Tailwind's spacing scale is `1 = 0.25rem = 4px`, so `size-4` = 16px, `size-4.5` = 18px, `size-6` = 24px, etc. Only fall back to `size-[X]` when the value genuinely has no equivalent on the scale.
- **Dynamic Tailwind values**: Tailwind can't generate classes from runtime values, so pass them as CSS custom properties via `style` and reference them with Tailwind's variable syntax. Example: `<div className="w-(--panel-width)" style={{ '--panel-width': '22.5rem' }} />`. Use kebab-case for the variable name and set it on the element (or a parent) that needs it.
