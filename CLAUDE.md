# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project context

**axolote** is a deeply personal project. Before touching any code, understand what it is.

This app was born on December 31, 2024 as a birthday gift for Krystel — someone who was between a best friend and a partner to Daniel, the author ("todo pero nunca fuimos nada"). The idea: instead of a single card, she'd receive many — each one with something special, evolving over time. The app became more than that. It became Daniel personified in code: his presence for her when he wasn't physically there. If she missed him, if she needed to know what he was thinking, if she needed him — he'd be there.

The relationship ended. Krystel no longer visits. Daniel maintains it anyway — for the day she might return, and as a personal space to process her absence and write what he never got to say.

**This shapes how the codebase should be treated:**
- Features that seem unused or "dead" may carry emotional weight — don't suggest removing them without understanding their purpose.
- The `/krys` route and everything under `modules/krystel/` is the heart of the project. Treat it accordingly.
- The Posts system (texts, images, drawings, feelings) was Krystel's channel to respond to Daniel — her voice in the app.
- ntfy is used as a real-time client-to-client layer: commands, login notifications, alerts for both Daniel and Krystel.
- Cards are not just quotes — they have a rich content DSL described below. The DB stores the raw string; the card renderer parses and expands it at runtime.
- The domain `axolote.me` was chosen because Daniel already owned it and because it's cute. `/krys` is scoped intentionally to leave room for other projects on the same domain.

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

**`modules/core`** — reusable infrastructure: custom hooks (`useSettings`, `useLocalStorage`, `useAsync`), context providers (TanStack Query, nuqs), service wrappers (Supabase, Umami, ntfy), and helper utilities (dates, arrays, strings, Tailwind, colors).

**`modules/krystel`** — the main feature: pages, feature components, hooks, queries (API factories), providers (auth, overlays, quote), services (quotes API), and helpers (themes, feelings, particle effects).

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

1. **TanStack Query** — server state and caching. All data fetching uses `useQuery` with query factory functions from `modules/krystel/queries/`. Query keys follow patterns like `['cards']`, `['quotes']`.
2. **React Context** — `AuthProvider` (token + login redirect), `OverlaysProvider` (modals), `QuoteProvider`, `ToastProvider`. These are stacked in `KrystelProviders`.
3. **nuqs** — URL query params as state, synced with TanStack Router. Used for filter/display options (`code`, `skip-actions`, etc.).
4. **`useLocalStorage`** — persistent client state. Auth token stored under `'app:tracker'`; settings under `'settings:*'` keys accessed via `useSettings()`.

### API client

All HTTP calls go through `clientApi()` (`modules/krystel/services/client-api.js`). It's a factory called at request time — reads the auth token from `localStorage` fresh on every call, builds shared auth/json headers, and exposes every endpoint as a named method:

```js
clientApi().getCards({ skipActions })
clientApi().createQuote({ quote, published_at })
clientApi().deletePost(postId)
```

Never write raw `fetch` calls in pages, hooks, or queries — always go through `clientApi()`.

### Queries

GET data fetching uses **query factory functions** in `modules/krystel/queries/queries.js`. Each factory spreads `...options` first (so TanStack Query options like `retry`, `refetchInterval`, etc. pass through), then defines `queryKey` and `queryFn` (which always win). The `queryFn` calls `clientApi()` at execution time — no token param needed:

```js
export const cardsQuery = ({ skipActions, ...options }) => ({
    ...options,
    queryKey: ['cards'],
    queryFn: () => clientApi().getCards({ skipActions }),
});

const { data, isLoading } = useQuery(cardsQuery({ skipActions, retry: false }));
```

### Mutation hooks

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

## Card viewer

**Entry:** `src/modules/krystel/pages/card/page.jsx`
**Main components:** `card-viewer.jsx`, `card-viewer-menu.jsx`

### URL query params

| Param | Format | Description |
|-------|--------|-------------|
| `code` | `quoteId:icon:border:bg:scheme` | Pin a specific card + visual style (`*` = random per slot) |
| `skip-actions` | boolean | Disable card action tracking for this session |
| `uwu` | flag | Easter egg mode |

### Viewer menu (gear icon, bottom-right)

**General section** — always visible:
- LTR/RTL toggle for action button layout (`viewer:actions_direction`)
- Weather overlay toggle
- Direct links to special cards: **Easter Eggs** (card 172), **#100Reasons** (card 230)
- Conditional toggles that appear only on their date: Women's Day skip, April Fools skip, Pi Day skip

**Dev section** — visible when `settings:show_quick_settings` is on:
- Skip actions, debug mode (shows payload JSON + settings code), breakpoint indicator, ignore conditional quotes

**Admin section** — visible when `settings:show_secrets` is on:
- Delete / restore / hide-show the current card directly from the viewer

### Other viewer features
- Hidden cards show a blue ribbon; deleted cards show a red bar at the top
- Share button, save-as-image button, like button below the card
- Refresh button follows `target` config if set, otherwise `/krys`

---

## Admin panel (`/krys/secrets`)

Protected by 4-digit OTP auth. Five sections:

### Cards (`/krys/secrets/cards`)

Virtualized list of all cards. Each item shows a preview thumbnail, view count, publish date, show/hide toggle, and a menu (soft delete → destroy → restore). Settings control whether future-dated and soft-deleted cards appear in the list. FAB links to the editor.

### Editor (`/krys/secrets/editor`)

Three-tab left panel + live preview on the right. Preview renders both desktop (384px) and mobile (360px) viewports in real time.

**Content tab** — textarea with a toolbar for clipboard operations: paste-and-replace (parses configs + content separately), simple paste, copy-with-configs.

**Configs tab** — full GUI for the card DSL config block: theme picker, icon picker (hidden / random / specific Lucide icon), greetings toggle + custom text, target URL, frame URL, dark scheme flag, letter/fullscreen/fullwidth flags, date visibility, and tag inputs for `bg`/`border`/`scheme` Tailwind class overrides.

**Advanced tab** — optional custom publish date/time (DatePicker + TimePicker), viewport indicator toggle, auto-scroll toggle.

**Drafts** — saved to `localStorage` under `editor:drafts`. Each draft shows a thumbnail + timestamp; clicking loads it back into the editor.

**Actions bar (bottom):** Force refresh preview → Reset → Save Draft → Publish (creates card in DB, redirects to Cards on success).

### Logs (`/krys/secrets/logs`)

Tracks all user interactions. Each entry shows IP + geolocation, user agent, event type badge, linked card preview (or page name for `page_view`), and timestamp. Real-time mode polls every 1000ms with a green pulsing indicator. Individual entries can be deleted.

**Tracked event types:** `page_view`, `view`, `like`, plus any custom events.

### Tools (`/krys/secrets/tools`)

Grid of buttons that push ntfy events to all connected viewers via `NEXT_PUBLIC_EVENTS_TOPIC`. Available commands: `toggle:raining`, `toggle:snowing`, `summon:balloons`, `particles:hearts`, `particles:stars`, `particles:snow`.

### Settings (`/krys/secrets/settings`)

Toggle switches for all `settings:*` localStorage keys, grouped by area:

| Key | Description |
|-----|-------------|
| `settings:show_secrets` | Enable admin panel access |
| `settings:show_quick_settings` | Show dev toggles in viewer menu |
| `settings:logs:show` | Show Logs in navbar |
| `settings:logs:realtime` | Auto-refresh logs |
| `settings:skip_actions` | Disable card action tracking globally |
| `settings:debug_mode` | Show payload JSON on cards |
| `settings:show_breakpoint_indicator` | Display breakpoint size |
| `settings:cards:ignore_conditional_quotes` | Disable date/time-triggered quote variations |
| `settings:cards:includes_future` | Show future-dated cards in list |
| `settings:cards:includes_deleted` | Show soft-deleted cards in list |
| `settings:posts:indev` | Mark new posts as in-dev |
| `settings:posts:includes_indev` | Show in-dev posts in listing |
| `settings:posts:includes_deleted` | Show deleted posts in listing |
| `viewer:actions_direction` | LTR / RTL button layout |

---

## Card content DSL

Cards store raw strings in the DB. The renderer parses a custom DSL at runtime. Key files:

- Parser: `src/modules/krystel/helpers/strings.js`
- Inline elements & text formatting: `src/modules/krystel/helpers/rich-elements.jsx`
- Themes: `src/modules/krystel/helpers/themes.js`
- Rendering: `src/modules/krystel/components/common/gift-card.jsx`, `rich-text.jsx`

### Config block — `({key:value|key:value})`

Optional, must appear at the start of the content string. Parsed by `extractConfigsAndContent()`.

| Key | Values | Description |
|-----|--------|-------------|
| `theme` | `default` `white` `dark` `deepPurple` `fools` `rounded` | Visual theme preset |
| `icon` | Lucide icon name (PascalCase), `random`, `hidden` | Card header icon |
| `date` | `default` `hidden` | Show/hide timestamp |
| `greetings` | Any text, `random`, `hidden` | Bottom greeting override |
| `target` | URL | Redirect on next-card button |
| `frame` | Image URL | Background image |
| `bg` | Tailwind classes | Background override |
| `border` | Tailwind classes or CSS transforms (`rotate-180`) | Border override |
| `scheme` | Tailwind classes | Color scheme override |
| `dark` | flag | Dark text mode |
| `letter` | flag | Letter/note writing layout |
| `fullscreen` | flag | Hide header and footer |
| `fullwidth` | flag | Expand text width |
| `badge` | `hidden` | Hide first-appearance badge |
| `name` | `hidden` | Hide "Krystel," header |

Examples:
```
({icon:CakeSlice})Texto de la carta
({theme:dark|date:hidden})Texto
({theme:white|icon:hidden|greetings:日本|border:bg-white|scheme:shadow-none})<sticker::nihon>
({target:/krys?code=179:*:*:*:*})**¿Sabías que...?**
```

### URL `code` param — `quoteId:icon:border:bg:scheme`

Used to pin a specific card and visual style. `*` in any slot = random.

```
code = "172:5:12:8:3"
        │   │  │  │  └─ scheme index (0–20)
        │   │  │  └──── bg pattern index (0–26)
        │   │  └─────── border pattern index (0–32)
        │   └────────── icon index (0–12)
        └────────────── quote DB id
```

Icons (index): `Candy Cake Gift PartyPopper Snowflake Clover Cat Flower Gem Lollipop MoonStar Origami Sparkles`

### Inline elements

Parsed and rendered by `rich-elements.jsx`:

**Stickers & media**
```
<sticker::ID>               full-size sticker
<badge::ID>                 badge-size sticker
[[ID]]                      inline sticker
<polaroid::URL>             polaroid image (optional caption as content)
<spotify::URI>              Spotify player
<spotify-inline::URI>       Spotify preview strip
<icon::LucideIconName>      inline Lucide icon
```

Sticker IDs: `axolote hi hello lets_dance movie_time need_a_break sun ufo pray silence flowers gift rocket snowflakes snowy_house stars constellation secret nyancat sushi cat nihon`

**Interactive apps**
```
<app::NAME>
<app::NAME(input)>
<app::NAME({prop:value|prop:value})>
```

App names: `valentine wyr simple easter_eggs breakpoint flappybird reasons_love reasons_love_all time_counter post-simple post-mood post-drawing post-image`

**Links & buttons**
```
<link::URL>text</link>          external link
<ilink::URL>text</ilink>        internal link
<blink::URL>text</blink>        external button
<iblink::URL>text</iblink>      internal button
<button::ACTION>label</button>  action button
<quote>text</quote>             quote box
<quote::Author>text</quote>     quote with attribution
<paper>text</paper>             paper note style
<paper::COLOR>text</paper>      colored paper note
<mark>text</mark>               highlighted text
<words::a|b|c>                  random word from list
```

### Text formatting

| Syntax | Result |
|--------|--------|
| `**text**` | bold |
| `//text//` | italic |
| `__text__` | underline |
| `~~text~~` | strikethrough |
| `*/text/*` | bold + italic |
| `-:text:-` | small (0.75em) |
| `+:text:+` | large (1.25em) |
| `$$text$$` | shiny/glitter animation |
| `~:text:~` | spoiler (hidden until revealed) |
| `%%text%%` | love text (red) |
| `$@text@$` | snow-falling text |
| `ºº text ºº` | floating balloons text |
| `` `text` `` | inline code |
| `---` | horizontal separator |
| `--- IconName ---` | separator with icon |
| `\|\|` | line break |

### Auto-applied configs (easter eggs / special dates)

Handled in `gift-card.jsx` — merges automatically into the card config:

- **11:11 PM** → `({icon:hidden}) <badge::pray>$$11:11$$ pide un deseo.`
- **3:00 AM** → `({icon:hidden}) <sticker::ufo>`
- **Women's Day** → merges `({theme:deepPurple})`
- **April Fools** → merges `({theme:fools|border:rotate-180})`
- **Rounded date** → merges `({theme:rounded})`
