# Green Riverside Cosy Home

Production-ready website for Green Riverside Cosy Home — a family-run hospitality business in Phong Nha, Vietnam.

**"Come as our guest, leave as our family."**

## Tech Stack

- **Next.js 16** (App Router) + TypeScript
- **Tailwind CSS 4** + Framer Motion
- **Firebase** (Auth, Firestore, Storage, Analytics, Hosting)
- **React Hook Form** + Zod validation

## Quick Start

```bash
npm install
cp .env.example .env.local
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Features

- Full public website (Home, Story, Stay, Eat & Drink, Tours, Transportation, Activities, Gallery, Blog, Contact)
- WhatsApp-first booking conversion on every CTA
- SEO infrastructure (sitemap, robots.txt, JSON-LD schemas, Open Graph)
- Protected Admin CMS with Firebase Authentication
- Seed data fallback when Firebase is not configured
- Mobile-first responsive design

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage with all sections |
| `/our-story` | Brand storytelling |
| `/stay` | Room listings |
| `/stay/[slug]` | Room detail |
| `/eat-drink` | Rooftop café |
| `/tours` | Tour listings |
| `/tours/[slug]` | Tour detail |
| `/transportation` | Transport services |
| `/social-activities` | Weekly schedule |
| `/gallery` | Photo gallery with filters |
| `/blog` | Blog with search & categories |
| `/blog/[slug]` | Blog post |
| `/contact` | Contact info & FAQ |
| `/admin` | CMS dashboard |

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for full deployment instructions.

## Documentation

- [Firestore Schema](./docs/FIRESTORE_SCHEMA.md)
- [Deployment Guide](./DEPLOYMENT.md)

## Design System

| Token | Value |
|-------|-------|
| Primary Green | `#1F6F43` |
| Secondary Green | `#4CAF50` |
| Soft Green | `#EAF7EE` |
| Accent | `#F7C948` |
| Text | `#1A1A1A` |
| Heading Font | Playfair Display |
| Body Font | Inter |
