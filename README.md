# ITELECT4

## Module 1: TypeScript Fundamentals

```text
          ▟██▙          ▟██▙         itelect4@project
         ▓▓██████████████████▓▓        ----------------
        ▓▓████████████████████▓▓       Project:    GT1 – TypeScript Fundamentals
       ▓▓██████████████████████▓▓      Concept:    Core TypeScript types and advanced patterns
      ▐▓▓██████████████████████▓▓▌     Features:   Interfaces, type aliases, generics,
    ─ ▐▓▓██████████████████████▓▓▌ ─               utility types (Omit, Pick, Partial),
  ─── ▐▓▓██████^^██████^^██████▓▓▌ ───             enums, unions, intersections,
    ─ ▐▓▓██████████████████████▓▓▌ ─               type narrowing & const enums
       ▓▓██████████████████████▓▓
        ▀▓▓██████████████████▓▓▀       Interfaces: User, Event, RSVP
  ▄▀▀▄    ▀▀▓▓████████████▓▓▀▀
 ▐▌  ▐▌       ▀▀▓▓████▓▓▀▀             Install:    npm install
  ▀▄▄██     ▄▓▓██████████▓▓▄           Run:        npx ts-node src/index.ts
    ███   ▟▓▓██████████████▓▓▙         Check:      npx tsc --noEmit
      ▀██▓▓██████████████████▓▓
```

## Module 2: Vite, React, Tailwind CSS

```text
Project:    GT2 Final (Part 1, 2 & 3)                   ⟡              ⊹ ₊ ݁.     ⟡
            ITELECT4 React + Tailwind Architecture         ⊹   𓏲 ๋࣭  ࣪ ˖                .
Concept:    React components, Hooks, State, Tailwind UI  .         .    ⟡           ⊹
Components: UserCard, EventCard, RSVPBadge                  ⟡           ₊    ˚  ⊹    ♡     .
Features:   Responsive Grid, Dark Mode (class), Component Variants, ⊹       .      ⊹
            Loading & Error States, Search Filtering        .       . ݁₊   ⊹       .
Install:    npm install              ₊˚⊹♡                .                 ⟡        𓏲 ๋࣭
Run:        npm run dev                    ⊹                 ⟡        .       ˖
Build:      npm run build               ⟡                 ⊹         . ݁ ⟡ ݁ .       .
Check:      npx tsc --noEmit                  . ݁₊ ⊹         .             ⊹    ♡
```

## Module 3: React Router, Zustand, TanStack Query & Shadcn UI

```text
Project:    GT3 – Event RSVP & Check-In System
Concept:    Full-stack React SPA with routing, state, data fetching, and validated forms
Author:     Regina Angeli Cadeliña

─────────────────────────────────────────────────────────────────────────
  Part 1 — Session 6: Routing & Auth
─────────────────────────────────────────────────────────────────────────
  Library:    React Router v7 (react-router)
  Routes:     / (Dashboard), /events, /events/:id, /login, /rsvps
  Layout:     <Layout /> wraps all routes via <Outlet />
  Guards:     <ProtectedRoute /> reads Zustand auth token; redirects to /login
  Hooks:      typed useParams<{ id: string }>(), useNavigate()
  State:      Zustand authStore — token + userName

─────────────────────────────────────────────────────────────────────────
  Part 2 — Session 7: State, API & Data Fetching
─────────────────────────────────────────────────────────────────────────
  Persistence: authStore wrapped with persist middleware; partialize saves
               only { token, userName } to localStorage (key: rsvp-auth)
  UI Store:    uiStore — isDarkMode (persisted), searchTerm (session only)
  Backend:     json-server serving db.json on port 3001
               Collections: events, rsvps
  API Client:  src/api/client.ts — all fetch() calls in one place; no
               raw fetch elsewhere in the codebase
  API Types:   ApiRSVP (Omit<RSVP, "id"|"timestamp"> & string overrides)
               NewRSVP  (Omit<ApiRSVP, "id">)
  Queries:     useQuery(["events"])         → EventsPage, DashboardPage
               useQuery(["events", id])     → EventDetailPage (keyed by URL param)
               useQuery(["rsvps"])          → RSVPsPage
  Mutation:    useMutation(createRSVP) → onSuccess calls invalidateQueries(["rsvps"])

─────────────────────────────────────────────────────────────────────────
  Part 3 — Session 8: Forms, Validation & Shadcn UI
─────────────────────────────────────────────────────────────────────────
  Validation:  Zod schema (src/schemas/rsvpSchema.ts)
               Rules:   eventId must start with "EVT-"  (.refine())
                        guestName min 2 chars
                        guestCount 1–10
               Type:    RsvpFormValues = z.infer<typeof rsvpSchema>
  Form:        useForm<RsvpFormValues>({ resolver: zodResolver(rsvpSchema) })
               Invalid submit fires NO network request (check Network tab)
               Field errors rendered via formState.errors.[field].message
  UI Library:  Shadcn UI — Button, Input, Label used on RSVPsPage & LoginPage
               Alias @/ → src/ configured in tsconfig.app.json & vite.config.ts

─────────────────────────────────────────────────────────────────────────
  Commands
─────────────────────────────────────────────────────────────────────────
  npm install           install all dependencies
  npm run api           start json-server on http://localhost:3001
  npm run dev           start Vite dev server (run BOTH for full functionality)
  npm run build         production build — must complete with 0 TS errors
  npx tsc --noEmit      type-check only

  Git tags:   gt3   (end of Module 3 — do NOT delete)
```