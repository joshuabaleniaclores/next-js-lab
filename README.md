# Next.js Lab

A full-stack learning project built with Next.js App Router, practicing production-grade patterns for authentication, data fetching, state management, form validation, testing, and CI/CD.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| HTTP Client | Axios |
| Server State | TanStack Query |
| Client State | Zustand |
| Form Handling | React Hook Form |
| Validation | Zod |
| Notifications | Sonner |
| Testing | Jest + ts-jest |
| Containerization | Docker |
| CI/CD | GitHub Actions |
| Container Registry | GitHub Container Registry (ghcr.io) |
| API | DummyJSON (https://dummyjson.com) |

## Features

- **Authentication** — login with JWT, protected routes via middleware, session persisted in Zustand + cookie
- **Navigation** — sticky navbar with active link highlighting, user info, and logout
- **Products** — full CRUD: list with pagination, detail view, add, edit, delete
- **Error handling** — normalized API errors, global error boundary with retry, 404 page
- **Loading states** — skeleton loaders per route via `loading.tsx` and `isLoading` states
- **Notifications** — toast feedback on all mutations (Sonner)
- **Form validation** — client-side Zod schemas with react-hook-form
- **Icons** — Lucide React icons on all interactive elements

## Prerequisites

- Node.js 18+
- npm
- Docker (optional — for running via container)

## Getting Started

**1. Clone the repository**

```bash
git clone <repo-url>
cd next-js-lab
```

**2. Install dependencies**

```bash
npm install
```

**3. Set up environment variables**

```bash
cp .env.example .env.local
```

Open `.env.local` and fill in the values:

```env
NEXT_PUBLIC_API_URL=https://dummyjson.com
```

**4. Run the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Test Credentials

```
username: emilys
password: emilyspass
```

## Project Structure

```
src/
  app/
    (protected)/          # Route group — shared navbar layout, no URL impact
      layout.tsx          # Navbar wrapper for all protected pages
      dashboard/          # /dashboard
        loading.tsx       # Dashboard loading skeleton
      products/           # /products
        loading.tsx       # Products loading skeleton
        [id]/             # /products/[id]
          loading.tsx     # Product detail loading skeleton
    login/                # /login (public)
    error.tsx             # Global error boundary
    not-found.tsx         # Global 404 page
    layout.tsx            # Root layout (providers, fonts)
  components/
    ui/                   # shadcn/ui components
    layout/               # Navbar
    products/             # product-card, add/update dialogs, skeletons
  hooks/                  # TanStack Query hooks
  lib/                    # Infrastructure (axios instance)
  providers/              # React context providers
  schemas/                # Zod validation schemas
  services/               # API service functions
  store/                  # Zustand stores
  types/                  # TypeScript interfaces
  utils/                  # Pure utility functions
  middleware.ts           # Route protection
```

## Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm test             # Run tests
npm run test:watch   # Run tests in watch mode
```

## Running with Docker

**Build the image**

```bash
docker build -t next-js-lab .
```

**Run the container**

```bash
docker run -p 3000:3000 -e NEXT_PUBLIC_API_URL=https://dummyjson.com next-js-lab
```

Open [http://localhost:3000](http://localhost:3000).

## CI/CD Pipeline

The project uses GitHub Actions with two jobs:

### `ci` job — runs on every push and pull request
```
tsc --noEmit   → type check
lint           → ESLint
test           → Jest with coverage report
next build     → verify the app compiles
```

### `docker` job — runs only on push to main (after ci passes)
```
docker build   → multi-stage build via Dockerfile
docker push    → pushes image to ghcr.io
```

### Before pushing to main, run locally:

```bash
npx tsc --noEmit && npm run lint && npm test && npm run build
```

### GitHub secret required

```
Settings → Secrets and variables → Actions → New repository secret
Name:  NEXT_PUBLIC_API_URL
Value: https://dummyjson.com
```

## Architecture

The project follows a layered architecture — each layer has one responsibility and only communicates with the layer below it:

```
Pages / Components
  → Hooks (TanStack Query)
    → Services (axios calls)
      → Axios Instance (interceptors, auth token)
        → API (DummyJSON)
```

## Route Protection

Routes are protected via Next.js middleware (`src/middleware.ts`):

- `/login` — public, redirects to `/dashboard` if already authenticated
- All other routes — require authentication, redirect to `/login` if not
