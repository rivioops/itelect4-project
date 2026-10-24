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
  Module 4 — Guided Task 4: Real Backend, Auth & Deployment
─────────────────────────────────────────────────────────────────────────
  API Client:  src/api/client.ts — consolidated generic request<T>() reading
               import.meta.env.VITE_API_URL, automatically attaching JWT
               Authorization: Bearer <token> for authenticated calls
  Derived:     Corrected ApiRSVP & NewRSVP types; client no longer hardcodes
               id, userId, or timestamp (assigned by MongoDB and backend auth)
  Auth UI:     LoginPage & RegisterPage hooked up to /api/auth/login and
               /api/auth/register; real JWT token persisted in Zustand store
  Clean Up:    json-server removed; db.json deleted; no mock server scripts

─────────────────────────────────────────────────────────────────────────
  Commands
─────────────────────────────────────────────────────────────────────────
  npm install           install all dependencies
  npm run dev           start Vite dev server
  npm run build         production build — must complete with 0 TS errors
  npm run lint          run ESLint checks
  npx tsc --noEmit      type-check only

  Git tags:   gt3   (end of Module 3 — do NOT delete)
```

## GT4 Part 2: Live Deployment

- **Frontend:** [itelect4-project-ten.vercel.app](https://itelect4-project-ten.vercel.app/)
- **Backend:** [itelect4-backend-seven.vercel.app](https://itelect4-backend-seven.vercel.app/)
- **Backend health check:** [GET /api/health](https://itelect4-backend-seven.vercel.app/api/health)
- **Frontend repository:** [rivioops/itelect4-project](https://github.com/rivioops/itelect4-project)
- **Backend repository:** [rivioops/itelect4-backend](https://github.com/rivioops/itelect4-backend)

## GT5: AI Review (Gemini via the backend)

```text
Module:     Module 5 - Guided Task 5 (frontend half)
Route:      /review  (inside <ProtectedRoute />; logged-out users go to /login)
Nav:        "AI Review" link in src/components/Layout.tsx
Page:       src/pages/AiReview.tsx - validated form, useMutation, shows every
            field of the reply as plain text (never dangerouslySetInnerHTML)
Form:       src/schemas/reviewSchema.ts - reviewFormSchema, same limits and
            messages as aiRequestSchema in itelect4-backend
            (prompt: trim, min 20, max 2000 characters)
Type:       AiReview in src/types/index.ts
            { summary, highlights[], suggestions[], readiness }
            readiness: "ready" | "almost" | "not-yet"
API call:   askAi(prompt) in src/api/client.ts -> POST /api/ai through
            request<T>(); the Bearer token is attached automatically
Errors:     the API's own message is shown (400 validation, 429 rate limit or
            quota, 502 bad AI reply)
Security:   the browser never calls Gemini and holds no API key; only the
            backend has GEMINI_API_KEY

Branch:     gt5-ai   |   Tag after merge: gt5
```