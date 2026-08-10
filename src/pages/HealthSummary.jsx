import React from "react";
import { ArrowRight, CalendarRange, CheckCircle2, CircleAlert, TrendingDown, TrendingUp } from "lucide-react";
import { demoSummary } from "../data/mockData";
import AIInsight from "../components/AIInsight";

export default function HealthSummary({ onDoctor }) {
  return (
    <div className="mx-auto max-w-6xl">
      <div>
        <p className="text-sm font-semibold text-ink">AI health summary</p>
        <h1 className="mt-1 text-3xl font-black tracking-tight sm:text-4xl">Your week, in context.</h1>
        <p className="mt-2 max-w-2xl text-muted">A concise prototype summary generated from your sample entries.</p>
      </div>

      <div className="mt-8 rounded-3xl bg-ink p-6 text-white shadow-soft sm:p-8">
        <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-white/60">
          <span className="rounded-full bg-white/10 px-3 py-1">DEMO / SIMULATED AI</span>
          <span className="flex items-center gap-1"><CalendarRange size={14}/> Aug 3–9, 2026</span>
        </div>
        <h2 className="mt-6 max-w-3xl text-2xl font-bold leading-snug sm:text-3xl">{demoSummary.headline}</h2>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-white/65">P1 organizes what was logged; it does not diagnose, predict, or replace professional medical judgment.</p>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <section className="rounded-3xl border border-line bg-white p-6">
          <h2 className="text-lg font-bold">Key symptoms</h2>
          <div className="mt-5 space-y-4">
            {demoSummary.symptoms.map((x) => <div key={x} className="flex gap-3"><CheckCircle2 className="mt-0.5 shrink-0 text-ink" size={18}/><p className="text-sm leading-6">{x}</p></div>)}
          </div>
        </section>

        <section className="rounded-3xl border border-line bg-white p-6">
          <h2 className="text-lg font-bold">What changed?</h2>
          <div className="mt-5 rounded-2xl bg-cream p-5">
            <CircleAlert className="text-ink" size={20}/>
            <p className="mt-3 text-sm leading-7 text-ink/80">{demoSummary.changed}</p>
          </div>
        </section>
      </div>

      <section className="mt-6 rounded-3xl border border-line bg-white p-6">
        <h2 className="text-lg font-bold">Trend signals</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {demoSummary.trends.map((t) => {
            const Icon = t.tone === "warning" ? TrendingUp : TrendingDown;
            return <div key={t.label} className="rounded-2xl border border-line p-5">
              <div className="flex items-center justify-between"><span className="text-sm font-semibold text-muted">{t.label}</span><Icon size={18} className="text-ink"/></div>
              <p className="mt-4 font-bold">{t.value}</p>
            </div>;
          })}
        </div>
      </section>

      <div className="mt-6">
        <AIInsight>
          This is a product demonstration using predetermined sample data. In a production version, this section would be generated from the user's authorized health data and reviewed against appropriate safety and privacy requirements.
        </AIInsight>
      </div>

      <div className="mt-6 flex justify-end">
        <button onClick={onDoctor} className="btn-primary">Prepare doctor visit summary <ArrowRight size={17}/></button>
      </div>
    </div>
  );
}