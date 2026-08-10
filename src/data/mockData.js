export const symptomHistory = [
  { day: "Mon", date: "Aug 3", headache: 1, fatigue: 2, sleep: 7.5 },
  { day: "Tue", date: "Aug 4", headache: 2, fatigue: 3, sleep: 6.8 },
  { day: "Wed", date: "Aug 5", headache: 3, fatigue: 4, sleep: 6.2 },
  { day: "Thu", date: "Aug 6", headache: 2, fatigue: 3, sleep: 7.0 },
  { day: "Fri", date: "Aug 7", headache: 4, fatigue: 5, sleep: 5.9 },
  { day: "Sat", date: "Aug 8", headache: 3, fatigue: 4, sleep: 6.4 },
  { day: "Sun", date: "Aug 9", headache: 3, fatigue: 4, sleep: 6.1 },
];

export const initialSymptoms = [
  { id: 1, name: "Headache", severity: 3, note: "Mostly in the afternoon", time: "9:10 AM" },
  { id: 2, name: "Fatigue", severity: 4, note: "Low energy since morning", time: "10:30 AM" },
  { id: 3, name: "Sleep", severity: 2, note: "About 6 hours last night", time: "11:45 AM" },
];

export const demoSummary = {
  headline: "Headache and fatigue have been recurring this week.",
  symptoms: [
    "Headache reported on 5 of the last 7 days",
    "Fatigue has been moderate-to-high on recent entries",
    "Sleep has averaged about 6.5 hours",
  ],
  trends: [
    { label: "Headache", value: "↑ Increasing", tone: "warning" },
    { label: "Fatigue", value: "→ Persistent", tone: "neutral" },
    { label: "Sleep", value: "↓ Lower than usual", tone: "warning" },
  ],
  changed: "The most noticeable change is a combination of shorter sleep and increased afternoon fatigue.",
};

export const visitSummary = {
  overview:
    "Over the past week, the patient has consistently logged headache and fatigue symptoms alongside shorter sleep.",
  duration: "7 days",
  keySymptoms: [
    "Recurring headaches, mostly in the afternoon",
    "Persistent fatigue with lower energy",
    "Sleep averaging approximately 6–7 hours",
  ],
  observations: [
    "Headache severity peaked at 4/5 on Aug 7",
    "Fatigue remains elevated across recent entries",
    "Symptoms appear alongside reduced sleep duration",
  ],
  questions: [
    "Could the recent headache pattern have a common trigger?",
    "Is the current sleep pattern worth monitoring more closely?",
    "What additional information would be useful to track?",
  ],
};