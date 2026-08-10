# P1 Health — React + Tailwind Prototype

A polished frontend prototype for P1, a health-story organization concept.

## Features

- Landing page
- Patient dashboard with mock health data
- Add symptom interaction
- 7-day symptom visualization
- Simulated AI health summary
- Doctor visit summary
- Interactive natural-language demo
- Responsive desktop/mobile UI
- Print/save-PDF action on the doctor summary
- No backend or API key required

## Run locally

```bash
npm install
npm run dev
```

Then open the local Vite URL shown in the terminal.

## Build

```bash
npm run build
npm run preview
```

## Project structure

```text
src/
├── components/
├── data/
├── pages/
├── App.jsx
├── main.jsx
└── index.css
```

## Important prototype note

The AI behavior and health data are simulated. This prototype must not be represented as a medical diagnostic system or used for clinical decision-making.

When P1's actual backend/API is available, the mock data and simulated summary functions can be replaced with real API calls.
