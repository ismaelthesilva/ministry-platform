# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
npm run dev          # Next.js + Vitest concurrently (preferred)
npm run dev:full     # Next.js + Prisma Studio + Vitest concurrently

# Build & Start
npm run build        # Runs prisma generate then next build
npm start

# Testing
npm test             # Run Vitest (single run)
npm run test:watch   # Vitest in watch mode
npm run test:ui      # Vitest with browser UI
npm run test:coverage

# Linting & Formatting
npm run lint         # Prettier check + fix
npm run lint:eslint:check

# Database
npm run db:migrate   # Run Prisma migrations
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema without migration
npm run db:studio    # Open Prisma GUI
npm run db:seed      # Seed the database

# Commits (enforced conventional commits)
npm run commit       # Commitizen interactive prompt
```

Run a single test file: `npx vitest run src/path/to/file.test.tsx`

## Architecture

**Next.js 16 App Router** with React 19, TypeScript, Tailwind CSS 4, Prisma 7 (PostgreSQL/Neon), NextAuth v5 beta.

### Route Groups

- `(auth)/login` — Public auth pages, no layout
- `(landing-pages)/king-of-kings` (EN) and `rei-dos-reis` (PT) — Marketing landing pages
- `dashboard/` — Protected: plans, profile, readings
- `bible-tracker/` — Protected: reading plan tracker
- `Revelation/` — 26-chapter Revelation analysis (static content)
- `nwayouth/` — Youth ministry section

Routes under `/dashboard` and `/bible-tracker` are protected via middleware (`src/proxy.ts` → `src/auth.config.ts`). Unauthenticated users are redirected to `/login?callbackUrl=...`.

### Authentication

NextAuth v5 beta with Credentials provider (email/password via bcryptjs) and Prisma Adapter. JWT session strategy.

- `src/auth.ts` — Main config with Credentials provider (requires DB access)
- `src/auth.config.ts` — Edge-compatible config for middleware use only
- `src/proxy.ts` — Middleware export

### Database (Prisma + Neon PostgreSQL)

Key models: `User` (extended with profile fields + `selectedPlanId`), `Plan`, `DailyReading` (365 entries per plan), `UserProgress`. Standard NextAuth models (`Account`, `Session`, `VerificationToken`) plus `Authenticator` for WebAuthn (prepared but inactive).

Always run `db:generate` after schema changes. Migrations are in `prisma/migrations/`.

### i18n

Manual context-based implementation — no routing-level i18n library.

- Translations: `src/locales/en.json` and `src/locales/br.json`
- Revelation-specific: `src/locales/revelation/`
- `LanguageContext` in `src/context/` manages language state globally
- `LanguageProvider` wraps the root layout
- User language preference persisted in `User.preferredLanguage`

### Component Structure

- `src/components/ui/` — Shadcn/Radix UI primitives
- `src/components/home/` — Landing page sections
- `src/components/bible-tracker/` — Reading plan feature components
- `src/components/dashboard/` — Dashboard views

### Server Actions

Mutations use Next.js Server Actions (not API routes). Action files colocated with page directories (e.g., `src/app/dashboard/profile/actions.ts`).

### Testing

Vitest + React Testing Library + jsdom. Tests colocated with source files as `.test.tsx`. Setup file: `vitest.setup.ts`. Performance benchmarks in `tests/performance/`.

## Required Environment Variables

```
DATABASE_URL=          # Neon PostgreSQL connection string
AUTH_SECRET=           # Generate: openssl rand -base64 32
AUTH_RESEND_KEY=       # Resend API key
RESEND_VERIFICATION_EMAILS=
EMAIL_FROM=
AUTH_URL=              # http://localhost:3000 for dev
AUTH_TRUST_HOST=true   # For local dev
NEXT_PUBLIC_SITE_URL=  # Optional, defaults to localhost:3000
```

## Commit Convention

Commitlint enforces conventional commits. Valid types: `feat`, `fix`, `chore`, `refactor`, `test`, `docs`, `style`, `ci`, `perf`, `revert`. Use `npm run commit` for the interactive prompt.
