I am migrating my project from a monorepo structure to a single Next.js app.
My old codebase is in vite (Vite + React, with components, pages, assets, context, hooks, Tailwind, shadcn/ui).
My new codebase is in web (Next.js 14, App Router, TypeScript, Tailwind, shadcn/ui).

Please help me safely and efficiently migrate everything from vite to the new Next.js app in web, converting from a monorepo to a standard Next.js project (no monorepo, just Next.js + React).

Requirements:

Migrate all components, pages, and assets.
Convert React Router routes to Next.js file-based routing (App Router).
Move static assets from public to public.
Refactor any Vite-specific code/config to Next.js conventions.
Ensure all Tailwind and shadcn/ui styles work.
Migrate context/providers and hooks for compatibility with Next.js.
For interactive components, use 'use client' where needed.
Preserve and improve TypeScript types.
Remove unused code and optimize for Next.js best practices.
Provide a migration checklist and highlight any manual steps.
Output clear, step-by-step instructions and code examples for each migration step.
