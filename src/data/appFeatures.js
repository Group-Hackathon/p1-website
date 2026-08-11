export const appFeatures = [
  {
    id: "body-map",
    title: "3D Body Map",
    subtitle: "Show where it hurts, not just describe it.",
    description: "Tap directly on a 3D mannequin to mark pain, temperature, or photo locations. 23 selectable body regions with front/back views. Works offline, no network required.",
    icon: "BodyMap",
    color: "ink",
    screenshot: "/screenshots/03-checkin.png",
  },
  {
    id: "daily-checkin",
    title: "2-Minute Daily Check-In",
    subtitle: "Designed for when you're tired, stressed, or forgetful.",
    description: "Pain gauge (0-10), temperature, photos with ghost overlay for consistent framing. Push notification-driven. Missed check-in marking + retroactive entry.",
    icon: "Clock",
    color: "accent",
    screenshot: "/screenshots/04-pain.png",
  },
  {
    id: "ai-summary",
    title: "AI-Powered Analysis",
    subtitle: "Gemini analyzes your data so you don't have to.",
    description: "Daily micro-reports from multimodal data (photos, text, vitals). Trend detection across weeks. Natural-language summaries you can verify and edit.",
    icon: "Sparkles",
    color: "ink",
    screenshot: null,
  },
  {
    id: "physician-briefing",
    title: "One-Page Physician Briefing",
    subtitle: "Walk in with a file ready, not half-remembered details.",
    description: "PDF with pain/temperature charts, photo timeline, daily notes. Shareable via QR code or system share sheet. Professional graphs compiled from your data.",
    icon: "FileText",
    color: "ink",
    screenshot: "/screenshots/02-journey.png",
  },
  {
    id: "photo-tracking",
    title: "Photo Tracking",
    subtitle: "Consistent framing, day after day.",
    description: "Ghost overlay ensures identical angles for wound/condition monitoring. Photos linked to body map regions. Compare progression across the entire period.",
    icon: "Camera",
    color: "ink",
    screenshot: "/screenshots/05-photo.png",
  },
  {
    id: "privacy",
    title: "Privacy-First Architecture",
    subtitle: "Your data stays yours. Always.",
    description: "User-owned personal backend (self-deployable). Ephemeral cloud access with time-limited consent. Full data deletion on request. Works offline when needed.",
    icon: "Shield",
    color: "ink",
    screenshot: null,
  },
];

export const howItWorks = [
  {
    step: "01",
    title: "Start a follow-up",
    description: "Describe your situation in natural language. P1's AI recommends a tracking template co-created with physicians.",
    image: "/screenshots/01-home.png",
  },
  {
    step: "02",
    title: "Daily check-ins (~2 min)",
    description: "Pain level, temperature, a photo. P1 guides you with notifications and ghost overlays for consistent framing.",
    image: "/screenshots/04-pain.png",
  },
  {
    step: "03",
    title: "AI builds your file",
    description: "Gemini analyzes daily submissions and compiles micro-reports, charts, and trend signals into a clear health story.",
    image: "/screenshots/02-journey.png",
  },
  {
    step: "04",
    title: "Share with your doctor",
    description: "One-page PDF briefing with graphs, photos, and discussion questions. QR code for instant, secure sharing.",
    image: "/screenshots/03-checkin.png",
  },
];

export const testimonials = [
  {
    quote: "Finally, a way to show my doctor what happened between visits instead of trying to remember.",
    author: "Beta user, chronic pain tracking",
  },
  {
    quote: "The 3D body map is a game changer. I can mark exactly where it hurts and track it over time.",
    author: "Beta user, post-surgery recovery",
  },
];

export const trackingTypes = [
  { name: "Pain", levels: "0-10 scale + sharp/dull/throbbing qualities", available: true },
  { name: "Temperature", levels: "ºC / ºF, fever curve charts", available: true },
  { name: "Photos", levels: "Ghost overlay, body map linked", available: true },
  { name: "Notes", levels: "Free-text daily observations", available: true },
  { name: "Smartwatch", levels: "Heart rate, HRV, steps", available: false },
  { name: "Blood Pressure", levels: "Systolic / diastolic tracking", available: false },
];
