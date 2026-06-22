# Dashify — SaaS Analytics Dashboard

A full-stack analytics dashboard built with Next.js 16, demonstrating the App Router, Server Components, server actions, and GitHub OAuth authentication.

> Built as a learning project while exploring the Next.js App Router and modern full-stack React patterns.

---

## Features

- **Authentication** — GitHub OAuth via NextAuth.js with proxy-protected routes
- **Overview dashboard** — KPI stat cards and revenue/users charts
- **Analytics page** — monthly breakdowns with area and bar charts (Recharts)
- **Users table** — paginated, filterable list with role and status badges
- **User profile** — per-user settings form with edit support
- **Add user** — form to create new users
- **Settings** — account preferences form
- **Notifications** — bell dropdown with read/unread state
- **Responsive layout** — fixed sidebar, topbar with live session avatar

---

## Tech Stack

| | |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Auth | NextAuth.js v5 (GitHub OAuth) |
| Charts | Recharts |
| Icons | Lucide React |
| Formatting | Prettier + ESLint |

---

## Next.js Concepts Demonstrated

- **Server Components** — pages fetch data on the server with no client JS
- **Client Components** — interactive islands (`"use client"`) only where needed
- **Server Actions** — form submissions handled server-side without an API layer
- **Proxy** — route protection redirecting unauthenticated users to `/login` (Next.js 16 renamed middleware to proxy)
- **Dynamic routes** — `/dashboard/users/[id]` with typed `PageProps<>` helper
- **API routes** — `/api/users` and `/api/stats` with pagination and filtering
- **Route groups** — `(auth)` and `(dashboard)` to share layouts without affecting URLs
- **Loading / error boundaries** — `loading.tsx` and `error.tsx` per segment

---

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm
- A GitHub OAuth app ([create one here](https://github.com/settings/developers))

### 1. Clone and install

```bash
git clone https://github.com/cris-milona/nextjs-saas-dashboard.git
cd nextjs-saas-dashboard
pnpm install
```

### 2. Set up environment variables

Create a `.env.local` file in the root:

```env
AUTH_SECRET=your_auth_secret        # generate with: openssl rand -base64 32
GITHUB_CLIENT_ID=your_client_id
GITHUB_CLIENT_SECRET=your_client_secret
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

Set the GitHub OAuth callback URL to:
```
http://localhost:3000/api/auth/callback/github
```

### 3. Run the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
app/
├── (auth)/login/          # Login page (public)
├── (dashboard)/           # Protected layout with sidebar + topbar
│   └── dashboard/
│       ├── page.tsx       # Overview
│       ├── analytics/     # Charts and metrics
│       ├── users/         # User table, add user, user profile
│       └── settings/      # Account settings
└── api/
    ├── users/             # GET /api/users (paginated + filtered)
    └── stats/             # GET /api/stats

components/
├── charts/                # RevenueChart, UsersChart
├── layout/                # Sidebar, Topbar, NotificationBell
└── ui/                    # StatCard
```

---

## Data

The app uses mock data defined in `lib/mock-data.ts`. In a production app this would be replaced with a database (e.g. PostgreSQL via Neon with Drizzle ORM). The server actions (`addUser`, `updateUserProfile`, `deleteUser`) are wired up and ready to connect to a real data layer.

---

## Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Production build
pnpm lint         # Check for lint errors
pnpm lint:fix     # Auto-fix lint errors (including import order)
pnpm format       # Format all files with Prettier
```
