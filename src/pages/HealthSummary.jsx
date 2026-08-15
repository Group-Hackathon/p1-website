import React from "react";
import { MoveRight, CalendarRange, CheckCircle2, CircleAlert, TrendingUp, TrendingDown, Sparkles, Activity } from "lucide-react";
import { demoSummary, getDateRange } from "../data/mockData";

export default function HealthSummary({ onDoctor }) {
  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end border-b border-line pb-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-mint px-3 py-1 text-xs font-bold uppercase tracking-wider text-mint-dark mb-2">
            <Sparkles size={14} /> Clinical Intelligence
          </div>
          <h1 className="text-3xl font-black tracking-tight text-ink sm:text-4xl">
            Longitudinal Progress & Metrics
          </h1>
          <p className="mt-1 text-muted text-sm sm:text-base">
            Longitudinal trends, telemetry shifts, and baseline comparisons synthesized across the active consultation period.
          </p>
        </div>
        <button onClick={onDoctor} className="btn-primary shrink-0 text-sm px-5 py-3 shadow-md flex items-center gap-2">
          Physician Briefing PDF <MoveRight size={16} />
        </button>
      </div>

      {/* Hero Banner in Sage Dark */}
      <div className="mt-8 rounded-3xl bg-sage-dark p-6 text-white shadow-card sm:p-8 border border-sage">
        <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-white/80">
          <span className="rounded-full bg-mint px-3 py-1 font-bold text-mint-dark">ACTIVE SYNTHESIS</span>
          <span className="flex items-center gap-1"><CalendarRange size={14} /> Period: {getDateRange()}</span>
        </div>
        <h2 className="mt-5 max-w-3xl text-2xl font-black leading-snug sm:text-3xl text-white">
          {demoSummary.headline}
        </h2>
        <p className="mt-3 max-w-3xl text-xs sm:text-sm leading-relaxed text-white/75">
          Deterministic summary compiled from patient check-ins. Designed for consultation handoff; does not replace physician diagnosis.
        </p>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section className="rounded-3xl border border-line bg-white p-6 sm:p-8 shadow-card">
          <div className="flex items-center gap-2 text-sage-dark font-bold text-base mb-4">
            <CheckCircle2 size={20} className="text-sage" /> Key Telemetry Patterns
          </div>
          <div className="space-y-3">
            {demoSummary.symptoms.map((x) => (
              <div key={x} className="flex gap-3 text-sm leading-6 text-ink/90 rounded-2xl border border-line bg-cream p-3.5">
                <span className="h-2 w-2 rounded-full bg-sage shrink-0 mt-2" />
                <p>{x}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-line bg-white p-6 sm:p-8 shadow-card">
          <div className="flex items-center gap-2 text-sage-dark font-bold text-base mb-4">
            <CircleAlert size={20} className="text-sage" /> Critical Differential Shifts
          </div>
          <div className="rounded-2xl border border-mint-dark/30 bg-mint/40 p-5">
            <p className="text-sm leading-relaxed text-ink/90 font-medium">{demoSummary.changed}</p>
          </div>
        </section>
      </div>

      <section className="mt-8 rounded-3xl border border-line bg-white p-6 sm:p-8 shadow-card">
        <div className="flex items-center gap-2 text-sage-dark font-bold text-base mb-6">
          <Activity size={20} className="text-sage" /> Vital Signals & Trajectory
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {demoSummary.trends.map((t) => {
            const Icon = t.tone === "warning" ? TrendingUp : TrendingDown;
            return (
              <div key={t.label} className="rounded-2xl border border-line bg-cream p-5">
                <div className="flex items-center justify-between text-xs font-bold text-muted uppercase">
                  <span>{t.label}</span>
                  <Icon size={18} className={t.tone === "warning" ? "text-amber-600" : "text-sage"} />
                </div>
                <p className="mt-3 text-2xl font-black text-ink">{t.value}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
