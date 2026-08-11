import React, { useMemo, useState } from "react";
import { Activity, CalendarDays, Plus, Smile, Moon, Zap } from "lucide-react";
import { initialSymptoms, symptomHistory, getFormattedToday } from "../data/mockData";
import StatCard from "../components/StatCard";
import SymptomCard from "../components/SymptomCard";

export default function Dashboard({ onGenerate }) {
  const [symptoms, setSymptoms] = useState(initialSymptoms);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [severity, setSeverity] = useState(3);
  const [note, setNote] = useState("");

  const avgSleep = useMemo(() => (symptomHistory.reduce((a, b) => a + b.sleep, 0) / symptomHistory.length).toFixed(1), []);

  function addSymptom(e) {
    e.preventDefault();
    if (!name.trim()) return;
    setSymptoms((current) => [
      { id: Date.now(), name: name.trim(), severity: Number(severity), note: note || "No additional note", time: "Just now" },
      ...current,
    ]);
    setName(""); setNote(""); setSeverity(3); setShowForm(false);
  }

  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-semibold text-ink">{getFormattedToday()}</p>
          <h1 className="mt-1 text-3xl font-black tracking-tight sm:text-4xl">Good morning, Alex.</h1>
          <p className="mt-2 text-muted">Here’s a quick view of what you’ve logged recently.</p>
        </div>
        <button className="btn-primary" onClick={() => setShowForm(true)}><Plus size={18}/> Add symptom</button>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Symptoms today" value={symptoms.length} detail="3 logged categories" icon={Activity}/>
        <StatCard label="Avg. sleep" value={`${avgSleep}h`} detail="Last 7 days" icon={Moon}/>
        <StatCard label="Energy" value="4/10" detail="Lower than usual" icon={Zap}/>
        <StatCard label="Mood" value="6/10" detail="Stable this week" icon={Smile}/>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.25fr_.75fr]">
        <section className="rounded-3xl border border-line bg-white p-5 shadow-sm sm:p-7">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold">Today's symptoms</h2>
              <p className="mt-1 text-sm text-muted">Your latest check-in entries</p>
            </div>
            <CalendarDays className="text-muted" size={20}/>
          </div>
          <div className="mt-5 space-y-3">
            {symptoms.slice(0, 5).map((s) => <SymptomCard key={s.id} symptom={s}/>)}
          </div>
        </section>

        <section className="rounded-3xl border border-line bg-white p-5 shadow-sm sm:p-7">
          <h2 className="text-lg font-bold">7-day snapshot</h2>
          <p className="mt-1 text-sm text-muted">Severity trend, 1–5</p>
          <div className="mt-7 flex h-48 items-end gap-2">
            {symptomHistory.map((d) => (
              <div key={d.day} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
                <div className="flex h-36 w-full items-end justify-center gap-1">
                  <div title={`Headache ${d.headache}/5`} className="w-2 rounded-t bg-ink/80" style={{height: `${d.headache * 20}%`}}/>
                  <div title={`Fatigue ${d.fatigue}/5`} className="w-2 rounded-t bg-gray-700" style={{height: `${d.fatigue * 20}%`}}/>
                </div>
                <span className="text-[10px] font-semibold text-muted">{d.day}</span>
              </div>
            ))}
          </div>
          <div className="mt-5 flex gap-5 text-xs text-muted">
            <span className="flex items-center gap-2"><i className="h-2 w-2 rounded-full bg-ink/80"/> Headache</span>
            <span className="flex items-center gap-2"><i className="h-2 w-2 rounded-full bg-gray-700"/> Fatigue</span>
          </div>
        </section>
      </div>

      <div className="mt-6 rounded-3xl border border-ink/15 bg-gray-100/50 p-5 sm:p-7">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-ink">Ready to review?</p>
            <h2 className="mt-2 text-xl font-bold">Turn this week's entries into a concise health story.</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">The prototype will simulate an AI-generated summary from the sample data.</p>
          </div>
          <button onClick={onGenerate} className="btn-primary shrink-0">Generate summary</button>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-ink/40 p-5 backdrop-blur-sm">
          <form onSubmit={addSymptom} className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-soft sm:p-8">
            <div className="flex items-start justify-between">
              <div><h2 className="text-2xl font-bold">Add a symptom</h2><p className="mt-1 text-sm text-muted">This entry stays local in the demo.</p></div>
              <button type="button" onClick={() => setShowForm(false)} className="text-muted">✕</button>
            </div>
            <label className="mt-6 block text-sm font-semibold">Symptom
              <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="e.g. Headache" className="mt-2 w-full rounded-xl border border-line px-4 py-3 outline-none focus:border-ink" />
            </label>
            <label className="mt-4 block text-sm font-semibold">Severity: {severity}/5
              <input type="range" min="1" max="5" value={severity} onChange={(e)=>setSeverity(e.target.value)} className="mt-3 w-full accent-gray-800" />
            </label>
            <label className="mt-4 block text-sm font-semibold">Note
              <textarea value={note} onChange={(e)=>setNote(e.target.value)} rows="3" placeholder="What did you notice?" className="mt-2 w-full resize-none rounded-xl border border-line px-4 py-3 outline-none focus:border-ink" />
            </label>
            <div className="mt-6 flex gap-3">
              <button type="button" onClick={() => setShowForm(false)} className="btn-secondary flex-1">Cancel</button>
              <button className="btn-primary flex-1">Save symptom</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}