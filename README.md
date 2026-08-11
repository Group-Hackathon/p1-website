# P1 — Website & Interactive Demo

[![Built with Vite](https://img.shields.io/badge/Vite-6.x-646CFF?logo=vite)](https://vitejs.dev)
[![React 18](https://img.shields.io/badge/React-18.x-61DAFB?logo=react)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-06B6D4?logo=tailwindcss)](https://tailwindcss.com)

Marketing website and interactive demo for [Pre-Appointment 1](https://play.google.com/store/apps/details?id=com.preappointment1.app) (P1) — the app that prepares you for doctor visits by turning daily check-ins into a clear medical briefing.

· **App:** [Google Play](https://play.google.com/store/apps/details?id=com.preappointment1.app) · **Main repo:** [Group-Hackathon/p1](https://github.com/Group-Hackathon/p1)

---

## Features

- **Landing page** with screenshots, feature grid, how-it-works section, tracking types
- **Interactive demo** — enter a natural-language symptom note, get a simulated AI summary
- **Dashboard** — mock patient view with symptom cards, 7-day bar chart, add symptom modal
- **AI Health Summary** — trend signals, key symptoms, "what changed?" insight
- **Doctor Visit Summary** — print-ready one-page briefing with observations and questions
- **Responsive** — mobile-first, works on all screen sizes
- **Cloudflare Pages + Workers** — static site with serverless waitlist API

---

## Run locally

```bash
npm install
npm run dev
```

Open the Vite URL shown in the terminal.

## Build

```bash
npm run build
npm run preview
```

## Deploy to Cloudflare Pages

```bash
npx wrangler pages deploy dist --project-name=p1-website
```

### Worker setup (optional waitlist API)

1. Create a KV namespace:
   ```bash
   npx wrangler kv:namespace create WAITLIST_KV
   ```
2. Bind it in `wrangler.toml`:
   ```toml
   kv_namespaces = [
     { binding = "WAITLIST_KV", id = "<your-namespace-id>" }
   ]
   ```
3. Deploy: `npx wrangler pages deploy dist`

The waitlist endpoint is at `POST /api/waitlist` with body `{ "email": "..." }`.

---

## Project structure

```
src/
├── components/       # Layout, Navbar, Sidebar, Logo, StatCard, SymptomCard, AIInsight
├── data/             # mockData.js (sample patient data), appFeatures.js (product content)
├── pages/            # Landing, Dashboard, HealthSummary, DoctorSummary, Demo
├── App.jsx           # Root with page routing
├── main.jsx          # React entry point
└── index.css         # Tailwind + custom utilities

public/
├── screenshots/      # App screenshots (dashboard, journey, check-in, pain, photo)
├── favicon.svg
├── robots.txt
├── sitemap.xml
├── _headers          # Cloudflare security headers
└── _redirects        # SPA fallback routing

functions/
└── api/waitlist.js   # Serverless waitlist endpoint
```

---

## Important

The AI behavior and health data are simulated. This prototype must not be represented as a medical diagnostic system or used for clinical decision-making.

P1 is a product of **Living Patient Memory**. Contact: [contact@livingpatientmemory.com](mailto:contact@livingpatientmemory.com)
