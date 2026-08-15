import React, { useState } from "react";
import {
  Calendar,
  Clock,
  Sparkles,
  MoveRight,
  MapPin,
  Camera,
  Activity,
  CheckCircle2,
  AlertCircle,
  FileText,
  Thermometer,
  ShieldAlert,
  ChevronRight
} from "lucide-react";
import { getFormattedToday, getDateRange } from "../data/mockData";

export default function Dashboard({ onGenerate }) {
  const [events, setEvents] = useState([
    {
      id: 1,
      dateLabel: "TODAY • 08:30",
      content: "Routine Morning Check-in:\n• Pain Level: 4/10 (Mild tension)\n• Pain Areas: Head, Temporal zone\n• Body Temp: 37.4°C\n• Mobility Impact: Normal\n• Characteristics: Throbbing",
      type: "user",
      aiInsight: "Telemetry indicates morning baseline temp is within normal physiologic variation. Tension headache intensity down 20% vs day 3."
    },
    {
      id: 2,
      dateLabel: "YESTERDAY • 19:15",
      content: "Routine Evening Check-in:\n• Pain Level: 5/10 (Elevated after screen exposure)\n• Pain Areas: Head, Cervical\n• Body Temp: 37.8°C\n• Attached: Photo: photo_20260815_cervical.jpg",
      type: "user",
      aiInsight: "Mild subfebrile evening elevation noted (37.8°C). Logged photo cross-calibrated with baseline contour."
    },
    {
      id: 3,
      dateLabel: "2 DAYS AGO • 09:00",
      content: "Routine Morning Check-in:\n• Pain Level: 3/10\n• Pain Areas: Lower back\n• Body Temp: 36.8°C\n• Mobility Impact: Mild stiffness upon waking",
      type: "user",
      aiInsight: "Stiffness relieved by mild ambulation. Recorded into physician prep packet."
    }
  ]);

  return (
    <div className="mx-auto max-w-6xl">
      {/* Top Banner Greeting (Matching StitchHomeScreen.kt) */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end border-b border-line pb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-muted">
            {getFormattedToday()} • Living Patient Memory
          </span>
          <h1 className="mt-1 text-3xl font-black tracking-tight text-ink sm:text-4xl">
            Good morning, Alex.
          </h1>
          <p className="mt-1 text-sm sm:text-base text-muted">
            Your longitudinal clinical file is actively compiling for your upcoming appointment.
          </p>
        </div>
        <button
          onClick={onGenerate}
          className="btn-primary text-sm px-5 py-3 shadow-md shrink-0 flex items-center gap-2"
        >
          Generate Clinical Briefing <MoveRight size={16} />
        </button>
      </div>

      {/* Active Consultation File Hero Card (Exact replica of Stitch Active Follow-Up Card) */}
      <div className="mt-8 rounded-3xl border border-line bg-white p-6 sm:p-8 shadow-card">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center border-b border-line pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-mint px-3 py-1 text-xs font-bold text-mint-dark uppercase tracking-wider">
                Ongoing File
              </span>
              <span className="text-xs text-muted font-semibold">#P1-2026-MED</span>
            </div>
            <h2 className="mt-2 text-2xl font-black text-ink">
              Pre-Consultation Clinical Tracking
            </h2>
            <p className="text-sm text-muted mt-0.5">
              Longitudinal tracking between doctor appointments ({getDateRange()})
            </p>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-center">
              <p className="text-xs font-bold uppercase text-muted">Days Remaining</p>
              <p className="text-3xl font-black text-ink mt-0.5">4</p>
            </div>
            <div className="h-10 w-[1px] bg-line" />
            <div className="text-center">
              <p className="text-xs font-bold uppercase text-muted">File Readiness</p>
              <p className="text-3xl font-black text-sage mt-0.5">85%</p>
            </div>
          </div>
        </div>

        {/* Readiness Progress Bar */}
        <div className="mt-6">
          <div className="flex justify-between text-xs font-bold text-ink mb-2">
            <span>Consultation Preparation Progress</span>
            <span className="text-sage">85% Complete</span>
          </div>
          <div className="h-3 w-full rounded-full bg-cream overflow-hidden border border-line">
            <div
              className="h-full rounded-full bg-gradient-to-r from-sage to-mint-dark transition-all duration-500"
              style={{ width: "85%" }}
            />
          </div>
          <div className="mt-3 flex flex-wrap gap-4 text-xs text-muted">
            <span className="flex items-center gap-1 font-semibold text-ink">
              <CheckCircle2 size={14} className="text-sage" /> 6 Telemetry Check-ins
            </span>
            <span className="flex items-center gap-1 font-semibold text-ink">
              <Camera size={14} className="text-sage" /> 2 Anatomical Photos
            </span>
            <span className="flex items-center gap-1 font-semibold text-ink">
              <Activity size={14} className="text-sage" /> 3-Day Consistency Streak
            </span>
          </div>
        </div>
      </div>

      {/* Living Chronology Central Timeline (Mirror of JourneyScreen.kt) */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-ink">Living Chronology Stream</h2>
            <p className="text-xs text-muted">Deterministic patient telemetry & Gemini synthesis cards</p>
          </div>
          <span className="rounded-xl border border-line bg-cream px-3 py-1.5 text-xs font-bold text-ink">
            3 Recorded Days
          </span>
        </div>

        <div className="relative border-l-2 border-mint-dark/30 ml-4 sm:ml-8 pl-6 space-y-8">
          {events.map((ev) => (
            <div key={ev.id} className="relative group">
              {/* Timeline dot */}
              <div className="absolute -left-[31px] top-1.5 h-3.5 w-3.5 rounded-full bg-sage ring-4 ring-mint" />

              <div className="space-y-3">
                {/* User Check-In Bubble */}
                <div className="rounded-2xl border border-line bg-white p-5 shadow-card transition group-hover:border-sage/40">
                  <div className="flex items-center justify-between text-xs text-muted mb-2 border-b border-line/60 pb-2">
                    <span className="font-bold text-ink uppercase tracking-wider">{ev.dateLabel}</span>
                    <span className="rounded-full bg-cream border border-line px-2.5 py-0.5 text-[11px] font-semibold text-ink">
                      Patient Check-in
                    </span>
                  </div>
                  <pre className="whitespace-pre-wrap font-sans text-xs sm:text-sm text-ink leading-relaxed font-normal">
                    {ev.content}
                  </pre>
                </div>

                {/* AI Assistant Synthesis Bubble (Exact replica of Stitch AI card) */}
                {ev.aiInsight && (
                  <div className="rounded-2xl border border-mint-dark/20 bg-mint/40 p-4 shadow-sm ml-2 sm:ml-6">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-mint-dark uppercase tracking-wider mb-1">
                      <Sparkles size={13} /> P1 Clinical Assistant
                    </div>
                    <p className="text-xs sm:text-sm text-ink/90 leading-relaxed font-medium">
                      {ev.aiInsight}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}