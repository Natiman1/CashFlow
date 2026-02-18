# CashFlow — Personal Finance Tracker

A full-stack personal finance tracker built as a **pnpm monorepo**. Track income and expenses, manage budgets, categorize transactions, and visualize your financial health — all in one place.

---

## Features

- **Dashboard** — Overview of income, expenses, balance, active budgets, and recent transactions
- **Transactions** — Add, edit, delete, and filter transactions with CSV export support
- **Budgets** — Create budgets per category with real-time progress tracking and overspend alerts
- **Categories** — Manage custom income/expense categories
- **Statistics** — Charts and breakdowns for spending trends and category analysis
- **Settings** — Profile management, currency preferences, and data export
- **Authentication** — Secure sign-up / sign-in powered by Better Auth
- **Dark / Light mode** — System-aware theme switching via `next-themes`

---

## Tech Stack

| Layer           | Technology                                     |
| --------------- | ---------------------------------------------- |
| Framework       | [Next.js 16](https://nextjs.org/) (App Router) |
| Language        | TypeScript 5                                   |
| UI              | React 19, Tailwind CSS v4, Radix UI, shadcn/ui |
| Charts          | Recharts                                       |
| Tables          | TanStack Table v8                              |
| Forms           | React Hook Form + Zod                          |
| ORM             | Drizzle ORM                                    |
| Database        | PostgreSQL (via Supabase)                      |
| Auth            | Better Auth                                    |
| Email           | Resend                                         |
| Package Manager | pnpm (workspaces)                              |

---

## Project Structure

```
.
├── apps/
│   └── web/                  # Next.js web application
│       ├── src/
│       │   ├── app/          # App Router pages & layouts
│       │   │   ├── (auth)/   # Sign-in / Sign-up pages
│       │   │   ├── dashboard/# Dashboard, transactions, budgets, categories, statistics, settings
│       │   │   └── api/      # API route handlers
│       │   ├── components/   # Reusable UI components
│       │   ├── actions/      # Next.js Server Actions
│       │   ├── hooks/        # Custom React hooks
│       │   └── lib/          # Utility helpers & config
│       └── drizzle/          # Database migrations
│
└── packages/
    ├── db/                   # Drizzle schema & database client
    ├── auth/                 # Better Auth configuration
    ├── types/                # Shared TypeScript types
    ├── utils/                # Shared utility functions
    └── config/               # Shared configuration
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) ≥ 18
- [pnpm](https://pnpm.io/) ≥ 10 — `npm install -g pnpm`
- A PostgreSQL database (e.g., [Supabase](https://supabase.com/))

### 1. Clone the repository

```bash
git clone https://github.com/Natiman1/CashFlow.git
cd CashFlow
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Configure environment variables

Copy the example env file and fill in your values:

```bash
cp apps/web/.env.example apps/web/.env
```

| Variable              | Description                        |
| --------------------- | ---------------------------------- |
| `DATABASE_URL`        | PostgreSQL connection string       |
| `BETTER_AUTH_SECRET`  | Random secret for session signing  |
| `BETTER_AUTH_URL`     | Public base URL of the app         |
| `NEXT_PUBLIC_APP_URL` | Public base URL (used client-side) |
| `RESEND_API_KEY`      | API key for transactional emails   |

### 4. Run database migrations

```bash
pnpm --filter web db:migrate
```

### 5. Start the development server

```bash
pnpm dev:web
```

The app will be available at [http://localhost:3000](http://localhost:3000).

---

## Available Scripts

Run from the **monorepo root**:

| Command          | Description                           |
| ---------------- | ------------------------------------- |
| `pnpm dev:web`   | Start the web app in development mode |
| `pnpm build:web` | Build the web app for production      |

Run from **`apps/web`**:

| Command      | Description              |
| ------------ | ------------------------ |
| `pnpm dev`   | Start Next.js dev server |
| `pnpm build` | Production build         |
| `pnpm start` | Start production server  |
| `pnpm lint`  | Run ESLint               |

---

## Database Schema

The database is managed with **Drizzle ORM** and consists of the following tables:

- `user` — User accounts (managed by Better Auth)
- `session` / `account` / `verification` — Auth-related tables
- `categories` — Income and expense categories (per user)
- `transactions` — Financial transactions linked to a user and category
- `budgets` — Budget limits per category
- `notifications` — In-app budget alert notifications

---

## License

MIT
