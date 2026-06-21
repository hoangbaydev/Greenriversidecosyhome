# Deployment Guide — Green Riverside Cosy Home

## Prerequisites

- Node.js 18+
- Firebase CLI (`npm install -g firebase-tools`)
- A Firebase project with Authentication, Firestore, Storage, and Hosting enabled

## 1. Environment Setup

Copy the example environment file and fill in your values:

```bash
cp .env.example .env.local
```

Required variables:

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase Web API key |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Auth domain |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Project ID |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Storage bucket |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Messaging sender ID |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | App ID |
| `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` | Analytics measurement ID |
| `NEXT_PUBLIC_SITE_URL` | Production URL |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp number (no + prefix) |

## 2. Firebase Project Setup

```bash
firebase login
firebase use --add
```

Enable in Firebase Console:
- **Authentication** → Email/Password sign-in
- **Firestore Database** → Production mode
- **Storage** → Default bucket
- **Analytics** (optional)

Deploy security rules:

```bash
firebase deploy --only firestore:rules,storage
```

## 3. Create Admin User

1. Create a user in Firebase Authentication (Email/Password)
2. Add a document in Firestore `users/{uid}`:

```json
{
  "email": "admin@example.com",
  "displayName": "Admin",
  "role": "admin",
  "createdAt": "2025-01-01"
}
```

## 4. Seed Initial Content (Optional)

The website works out-of-the-box with seed data when Firebase is not configured. To populate Firestore, use the admin CMS at `/admin` after login, or import seed data manually using the collections defined in `docs/FIRESTORE_SCHEMA.md`.

## 5. Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

Admin CMS: [http://localhost:3000/admin](http://localhost:3000/admin)

## 6. Production Build

```bash
npm run build
npm start
```

## 7. Deploy to Firebase Hosting

Firebase Hosting with Web Frameworks supports Next.js:

```bash
firebase experiments:enable webframeworks
firebase deploy
```

This builds and deploys the Next.js app with server-side rendering support.

### Alternative: Vercel

The project is also compatible with Vercel deployment. Connect your repository and add environment variables in the Vercel dashboard.

## 8. Post-Deployment Checklist

- [ ] Update `NEXT_PUBLIC_SITE_URL` to production domain
- [ ] Update WhatsApp number
- [ ] Upload real images to Firebase Storage
- [ ] Populate content via Admin CMS
- [ ] Verify sitemap at `/sitemap.xml`
- [ ] Verify robots.txt at `/robots.txt`
- [ ] Test all WhatsApp CTAs
- [ ] Run Lighthouse audit (target: Performance ≥ 95, SEO = 100)
- [ ] Submit sitemap to Google Search Console

## Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── admin/            # Protected CMS dashboard
│   ├── blog/             # Blog listing & detail
│   ├── stay/             # Rooms listing & detail
│   ├── tours/            # Tours listing & detail
│   └── ...               # Other public pages
├── components/
│   ├── admin/            # Auth provider
│   ├── home/             # Homepage sections
│   ├── layout/           # Header, Footer
│   ├── seo/              # JSON-LD
│   ├── ui/               # Design system components
│   └── whatsapp/         # WhatsApp conversion
├── lib/
│   ├── data/             # Seed data & services
│   └── firebase/         # Firebase configuration
└── types/                # TypeScript interfaces
```

## Support

For issues with deployment, check Firebase CLI logs:

```bash
firebase deploy --debug
```
