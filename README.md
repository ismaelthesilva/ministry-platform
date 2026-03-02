# Ministry Platform - Bible Tracker Application

A full-stack web application built for ministry engagement, featuring an interactive Bible reading tracker with multi-plan support, user authentication, and progress analytics. Built with modern web technologies and enterprise-grade architecture patterns.

## 🎯 Project Overview

This platform provides a comprehensive Bible reading experience with three distinct reading plans, real-time progress tracking, and bilingual support (Portuguese/English). The application demonstrates advanced full-stack development capabilities including database design, authentication implementation, and responsive UI/UX design.

## 🚀 Tech Stack

### Core Framework & Runtime

- **Next.js 16** - React framework with App Router for server-side rendering and API routes
- **TypeScript** - Type-safe development with strict mode enabled
- **Node.js 22** - Runtime environment

### Database & ORM

- **PostgreSQL** - Production database hosted on Neon
- **Prisma 7** - Type-safe ORM with schema migrations and client generation
- **Prisma Adapter** - Custom PostgreSQL adapter for optimized queries

### Authentication

- **NextAuth.js v5** - Complete authentication solution with:
  - Credentials provider with bcrypt password hashing
  - JWT session strategy
  - Prisma adapter integration
  - Protected routes with middleware

### UI/UX

- **Tailwind CSS 4** - Utility-first styling
- **Shadcn/UI** - Reusable component system built on Radix UI
- **Lucide React** - Modern icon library
- **Responsive Design** - Mobile-first approach with full desktop support

### Testing

- **Vitest** - Unit and integration testing framework
- **React Testing Library** - Component testing utilities
- **jsdom** - DOM simulation for tests

## 📋 Key Features

### Authentication System

- Secure user registration with password hashing (bcrypt)
- JWT-based session management
- Protected routes with automatic redirects
- Session persistence across browser sessions

### Bible Reading Plans

Three distinct reading plans with 366 days of content each:

1. **Bible in 1 Year** - Chronological Bible reading plan
2. **Prophetic Plan** - Bible + Ellen G. White commentary (Spirit of Prophecy)
3. **Classical Plan** - Bible + Church Fathers and Classical Theologians commentary

### Progress Tracking

- Real-time progress calculation and visualization
- Day-of-year based reading assignment
- Persistent reading completion status
- Visual progress indicators with percentage completion

### Interactive Dashboard

- Excel-style table view of all 366 readings
- Dynamic column display based on plan type
- One-click reading completion with visual feedback
- Completed readings marked with checkmarks
- Color-coded row backgrounds for completed items

### User Experience

- Bilingual interface (Portuguese/English)
- Plan selection and switching capability
- Navigation bar with quick access to features
- Responsive design optimized for all devices
- Loading states and optimistic UI updates

## 🗄️ Database Architecture

### Schema Design

```prisma
// User Management
model User {
  id                String    @id @default(cuid())
  email             String?   @unique
  password          String?
  selectedPlanId    String?
  preferredLanguage String    @default("pt")
  // ... profile fields and relations
}

// Reading Plans
model Plan {
  slug        String   // 'bible-only', 'prophetic', 'classical'
  title       String
  language    String   // 'pt' or 'en'
  readings    DailyReading[]
}

// Daily Readings (366 days per plan)
model DailyReading {
  dayNumber        Int
  bibleTextMain    String
  bibleTextDevo    String?
  commentaryAuthor String?
  // ... additional fields
}

// User Progress
model UserProgress {
  userId    String
  readingId String
  completedAt DateTime
}
```

### Data Seeding

- Automated seed script for 2,196 reading entries (366 days × 6 plans)
- CSV-based data import capability
- Bilingual content support

## 🏗️ Architecture Patterns

### Server Actions

Implemented Next.js Server Actions for type-safe, server-side operations:

```typescript
// Type-safe server actions with automatic revalidation
export async function selectPlan(
  userId: string,
  planSlug: string,
  language: string,
);
export async function markReadingComplete(userId: string, readingId: string);
export async function getUserBibleTrackerData(userId: string);
```

### Component Structure

- Server Components for data fetching
- Client Components for interactivity
- Shared UI components library
- Separation of concerns with clear boundaries

### State Management

- Server-side state with Prisma
- Client-side state with React hooks
- Optimistic UI updates for better UX
- Router refresh for data synchronization

## 📁 Project Structure

```
ministry-platform/
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── migrations/            # Migration history
├── scripts/
│   └── seed-bilingual.ts      # Database seeding script
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   └── login/         # Authentication pages
│   │   ├── api/
│   │   │   └── auth/          # NextAuth API routes
│   │   ├── bible-tracker/     # Bible tracker feature
│   │   │   ├── page.tsx       # Main tracker page
│   │   │   └── actions.ts     # Server actions
│   │   └── page.tsx           # Homepage
│   ├── components/
│   │   ├── bible-tracker/     # Feature components
│   │   ├── ui/                # Shadcn components
│   │   └── home/              # Homepage sections
│   ├── lib/
│   │   └── prisma.ts          # Database client
│   └── auth.ts                # NextAuth configuration
├── public/                    # Static assets
└── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js 22+
- npm/yarn/pnpm
- PostgreSQL database (or Neon account)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd ministry-platform
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   ```bash
   # .env
   DATABASE_URL="postgresql://..."
   AUTH_SECRET="your-secret-key"
   ```

4. **Setup database**

   ```bash
   npx prisma generate
   npx prisma db push
   npm run db:seed:bilingual
   ```

5. **Run development server**

   ```bash
   npm run dev
   ```

6. **Open application**
   Navigate to `http://localhost:3000`

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run tests with UI
npm run test:ui

# Generate coverage report
npm run test:coverage
```

## 📦 Build & Deployment

```bash
# Create production build
npm run build

# Start production server
npm run start
```

### Deployment Platforms

- Optimized for Vercel deployment
- Compatible with any Node.js hosting
- Database hosted on Neon for production

## 🔒 Security Features

- Password hashing with bcrypt (salt rounds: 10)
- JWT-based session tokens
- Protected API routes
- SQL injection prevention via Prisma
- CSRF protection
- Secure authentication flow

## 🎨 Design System

- Consistent color palette with semantic naming
- Typography scale with responsive sizing
- Component variants for different contexts
- Accessible UI with ARIA attributes
- Dark/light mode support (configurable)

## 📊 Performance Optimizations

- Server-side rendering for faster initial load
- Static page generation where applicable
- Optimized database queries with Prisma
- Lazy loading for components
- Image optimization with Next.js Image
- Route prefetching

## 🔄 Development Workflow

- TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting
- Husky for git hooks (configurable)
- Conventional commits

## 🤝 Contributing

This project demonstrates professional development practices suitable for enterprise applications. Code reviews, testing, and documentation are prioritized.

## 📝 License

MIT License

---

**Built with ❤️ for ministry engagement and spiritual growth**
