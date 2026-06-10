# Next.js Lab

A full-stack learning project built with Next.js App Router, practicing production-grade patterns for authentication, data fetching, state management, and form validation.

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
| API | DummyJSON (https://dummyjson.com) |

## Prerequisites

- Node.js 18+
- npm

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
  app/                    # Next.js App Router pages
    login/                # Login page
    dashboard/            # Dashboard page (protected)
    products/             # Products list + detail pages (protected)
    error.tsx             # Global error boundary
    layout.tsx            # Root layout
  components/
    ui/                   # shadcn/ui components
    products/             # Product-specific components
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
