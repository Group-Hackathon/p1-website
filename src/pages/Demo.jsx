import React, { useState } from "react";
import { ArrowRight, LoaderCircle, Sparkles } from "lucide-react";

const examples = [
  "I've had a headache and felt tired since yesterday.",
  "My sleep was short this week and I've had low energy.",
  "I've noticed afternoon headaches several times this week.",
];

export default function Demo({ onSummary }) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  function generate() {
    if (!text.trim()) return;
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      setResult({
        headline: "Possible health-story summary",
        bullets: [
          "Headache and fatigue were mentioned in the recent note.",
          "The note indicates the symptoms started around yesterday.",
          "Additional tracking could capture severity, duration, sleep, and triggers.",
        ],
        next: "For a real clinical workflow, the patient and clinician should verify the summary and add any missing context.",
      });
      setLoading(false);
    }, 900);
  }

  return (
    <div className="mx-auto max-w-5xl">
      <div>
        <p className="text-sm font-semibold text-ink">Interactive demo</p>
        <h1 className="mt-1 text-3xl font-black tracking-tight sm:text-4xl">Show P1 the story.</h1>
        <p className="mt-2 max-w-2xl text-muted">Enter a natural-language symptom note. The prototype will turn it into a structured, simulated summary.</p>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
        <section className="rounded-3xl border border-line bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-center gap-2 text-sm font-bold text-ink"><Sparkles size={17}/> Simulated AI</div>
          <label className="mt-6 block text-sm font-bold">What are you experiencing?</label>
          <textarea value={text} onChange={(e)=>setText(e.target.value)} rows="8" placeholder="e.g. I've had a headache and felt tired since yesterday." className="mt-3 w-full resize-none rounded-2xl border border-line p-4 text-base leading-7 outline-none transition focus:border-ink focus:ring-4 focus:ring-gray-200" />
          <div className="mt-4">
            <p className="text-xs font-semibold text-muted">Try an example</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {examples.map((x) => <button key={x} onClick={()=>setText(x)} className="rounded-full border border-line px-3 py-2 text-left text-xs font-medium text-muted hover:border-ink/40 hover:text-ink">{x}</button>)}
            </div>
          </div>
          <button onClick={generate} disabled={!text.trim() || loading} className="btn-primary mt-6 w-full disabled:cursor-not-allowed disabled:opacity-50">
            {loading ? <><LoaderCircle className="animate-spin" size={18}/> Generating…</> : <>Generate summary <ArrowRight size={18}/></>}
          </button>
          <p className="mt-3 text-center text-xs text-muted">No real medical inference is performed in this prototype.</p>
        </section>

        <section className="rounded-3xl border border-line bg-cream p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted">Output</p>
          {!result ? (
            <div className="flex min-h-[330px] flex-col items-center justify-center text-center">
              <div className="grid h-16 w-16 place-items-center rounded-2xl bg-white text-ink shadow-sm"><Sparkles /></div>
              <h2 className="mt-5 text-lg font-bold">Your summary will appear here</h2>
              <p className="mt-2 max-w-xs text-sm leading-6 text-muted">Add a note on the left and generate a demo summary.</p>
            </div>
          ) : (
            <div className="pt-5">
              <div className="rounded-2xl bg-white p-5">
                <span className="rounded-full bg-gray-100 px-2.5 py-1 text-[10px] font-bold text-ink">SIMULATED</span>
                <h2 className="mt-4 text-xl font-bold">{result.headline}</h2>
                <div className="mt-5 space-y-3">
                  {result.bullets.map((x) => <div key={x} className="flex gap-3 text-sm leading-6"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ink"/>{x}</div>)}
                </div>
                <div className="mt-5 rounded-xl bg-cream p-4 text-xs leading-5 text-muted">{result.next}</div>
              </div>
              <button onClick={onSummary} className="btn-secondary mt-4 w-full">View full sample summary</button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}