# agents.md

This file provides context to AI coding assistants working in this repository.

## Project context

**axolote** is a deeply personal project. Before touching any code, understand what it is.

This app was born on December 31, 2024 as a birthday gift for Krystel — someone who was between a best friend and a partner to Daniel, the author ("todo pero nunca fuimos nada"). The idea: instead of a single card, she'd receive many — each one with something special, evolving over time. The app became more than that. It became Daniel personified in code: his presence for her when he wasn't physically there. If she missed him, if she needed to know what he was thinking, if she needed him — he'd be there.

The relationship ended. Krystel no longer visits. Daniel maintains it anyway — for the day she might return, and as a personal space to process her absence and write what he never got to say.

**This shapes how the codebase should be treated:**
- Features that seem unused or "dead" may carry emotional weight — don't suggest removing them without understanding their purpose.
- The `/krys` route and everything under `modules/krystel/` is the heart of the project. Treat it accordingly.
- The Posts system (texts, images, drawings, feelings) was Krystel's channel to respond to Daniel — her voice in the app.
- ntfy is used as a real-time client-to-client layer: commands, login notifications, alerts for both Daniel and Krystel.
- Cards are not just quotes — some are full mini-apps that taught Krystel how to use the Posts system organically.
- The domain `axolote.mx` was chosen because Daniel already owned it and because it's cute. `/krys` is scoped intentionally to leave room for other projects on the same domain.

**Infrastructure:**
- Frontend: deployed on Vercel
- Backend: Node.js + Supabase (Postgres) + some AI, at `endpoints.hckr.mx` — Daniel's own infrastructure (`hckr.mx` is his personal projects domain)
- Supabase was initially integrated in this frontend repo but migrated to the backend API — remnants in the frontend are dead code in transition
- Spotify: components exist to display a song by URI (functional); in-app playback was planned but blocked by needing Krystel to authenticate

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

**`modules/core`** — reusable across features: custom hooks (`useSettings`, `useLocalStorage`, `useAsync`), context providers (TanStack Query, nuqs), service wrappers (Supabase, Umami, ntfy), and utility helpers (dates, arrays, strings, colors).

**`modules/krystel`** — the main feature module. Contains pages, components, hooks, queries (API factories), providers (auth, overlays, quote state), services (quotes API layer), and helpers (themes, feelings, particle effects).

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

Data fetching uses `useQuery` with query factory functions from `modules/krystel/queries/`.

## API client

All HTTP calls go through `clientApi()` (`modules/krystel/services/client-api.js`). It's a factory called at request time — reads the auth token from `localStorage` fresh on every call, builds shared auth/json headers, and exposes every endpoint as a named method:

```js
clientApi().getCards({ skipActions })
clientApi().createQuote({ quote, published_at })
clientApi().deletePost(postId)
```

Never write raw `fetch` calls in pages, hooks, or queries — always go through `clientApi()`.

## Queries

GET data fetching uses **query factory functions** in `modules/krystel/queries/queries.js`. Each factory spreads `...options` first (so TanStack Query options like `retry`, `refetchInterval`, etc. pass through), then defines `queryKey` and `queryFn` (which always win). The `queryFn` calls `clientApi()` at execution time — no token param needed:

```js
export const cardsQuery = ({ skipActions, ...options }) => ({
    ...options,
    queryKey: ['cards'],
    queryFn: () => clientApi().getCards({ skipActions }),
});

const { data, isLoading } = useQuery(cardsQuery({ skipActions, retry: false }));
```

## Mutation hooks

Mutation hooks (`modules/krystel/hooks/use-*-action.js`) wrap `useMutation` with a `mutationFn` that calls `clientApi()` at mutation time. They always return the mutation object directly — no wrapper functions:

```js
// Standard — return mutation directly
export default function useDeleteQuoteAction() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: vars => clientApi().deleteQuote(vars),
        onSettled: () => queryClient.invalidateQueries({ queryKey: ['quotes'] }),
    });
}

// With custom logic (debounce, guards) — return { trigger, ...mutation }
export default function usePostAction({ action, settings }) {
    const mutation = useMutation({ mutationFn: vars => clientApi().postAction(vars) });
    const trigger = useDebouncedCallback(() => { ... mutation.mutate(...) }, 1000);
    return { trigger, ...mutation };
}
```

Callers use `mutation.mutate(vars)` for standard hooks, and destructure `{ trigger }` for hooks that expose custom logic.

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
