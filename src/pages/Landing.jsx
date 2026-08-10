import React from "react";
import { ArrowRight, Check, HeartPulse, LineChart, ShieldCheck, Sparkles, Stethoscope } from "lucide-react";
import Navbar from "../components/Navbar";

export default function Landing({ onDemo }) {
  return (
    <div id="home" className="min-h-screen bg-cream">
      <Navbar onDemo={onDemo} />

      <section className="relative overflow-hidden pt-32">
        <div className="absolute -right-32 top-20 h-80 w-80 rounded-full bg-gray-100 blur-3xl opacity-80" />
        <div className="absolute -left-32 top-72 h-64 w-64 rounded-full bg-white blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 pb-24 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:pb-32">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white px-3 py-1.5 text-xs font-bold text-ink">
              <Sparkles size={14} /> A clearer health story
            </div>
            <h1 className="max-w-3xl text-5xl font-black leading-[1.02] tracking-[-0.04em] text-ink sm:text-6xl lg:text-7xl">
              Your health story, ready before your visit.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
              P1 turns everyday symptom notes into an organized, easy-to-review health story—so you can spend less time remembering and more time talking with your clinician.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button onClick={onDemo} className="btn-primary">
                Try the interactive demo <ArrowRight size={18} />
              </button>
              <a href="#how-it-works" className="btn-secondary">See how it works</a>
            </div>
            <p className="mt-4 text-xs text-muted">Prototype only · AI output is simulated · Not medical advice</p>
          </div>

          <div className="relative">
            <div className="rounded-[2rem] border border-line bg-white p-4 shadow-soft">
              <div className="rounded-[1.5rem] bg-ink p-5 text-white">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-white/70">This week's story</span>
                  <span className="rounded-full bg-white/10 px-2 py-1 text-[10px] font-bold">DEMO</span>
                </div>
                <p className="mt-5 text-2xl font-bold">Headache + fatigue</p>
                <p className="mt-2 text-sm leading-6 text-white/60">Recurring over the last 7 days, with shorter sleep.</p>
                <div className="mt-7 grid grid-cols-3 gap-2">
                  <div className="rounded-xl bg-white/10 p-3"><p className="text-[10px] text-white/50">Headache</p><p className="mt-1 font-bold">5 days</p></div>
                  <div className="rounded-xl bg-white/10 p-3"><p className="text-[10px] text-white/50">Fatigue</p><p className="mt-1 font-bold">4/5</p></div>
                  <div className="rounded-xl bg-white/10 p-3"><p className="text-[10px] text-white/50">Sleep</p><p className="mt-1 font-bold">6.5h</p></div>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 text-sm font-bold text-ink"><Sparkles size={16}/> AI demo summary</div>
                <p className="mt-3 text-sm leading-6 text-muted">“The most noticeable change is shorter sleep alongside increased afternoon fatigue.”</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="border-y border-line bg-white py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-ink">How it works</p>
          <h2 className="section-title mt-3 max-w-2xl">From scattered notes to a useful visit summary.</h2>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              [HeartPulse, "Track", "Log symptoms, severity, sleep, mood, energy, and notes in seconds."],
              [Sparkles, "Understand", "P1 organizes your entries into patterns and a concise health story."],
              [Stethoscope, "Prepare", "Bring a structured summary and useful questions into your visit."],
            ].map(([Icon, title, text], i) => (
              <div key={title} className="rounded-3xl border border-line p-7">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gray-100 text-ink"><Icon /></div>
                <p className="mt-7 text-xs font-bold text-muted">0{i + 1}</p>
                <h3 className="mt-2 text-xl font-bold">{title}</h3>
                <p className="mt-3 leading-7 text-muted">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="benefits" className="py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-ink">Why P1</p>
              <h2 className="section-title mt-3">Make the time before a visit count.</h2>
              <p className="mt-5 max-w-xl leading-7 text-muted">Health information is often fragmented across memory, notes, apps, and conversations. P1 brings the story together without pretending to replace a clinician.</p>
              <div className="mt-8 space-y-4">
                {["A simple daily check-in", "Readable trends instead of raw logs", "A doctor-ready visit snapshot", "Designed with privacy in mind"].map((x) => (
                  <div key={x} className="flex items-center gap-3"><div className="grid h-7 w-7 place-items-center rounded-full bg-gray-100 text-ink"><Check size={15}/></div><span className="font-semibold">{x}</span></div>
                ))}
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-ink p-7 text-white sm:translate-y-6">
                <LineChart className="text-white/70" />
                <h3 className="mt-8 text-xl font-bold">See trends</h3>
                <p className="mt-3 text-sm leading-6 text-white/60">Understand how symptoms have changed over time.</p>
              </div>
              <div className="rounded-3xl border border-line bg-white p-7">
                <ShieldCheck className="text-ink" />
                <h3 className="mt-8 text-xl font-bold">Stay in control</h3>
                <p className="mt-3 text-sm leading-6 text-muted">Your entries are presented as information—not a diagnosis.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-line bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <LogoMark />
          <span>P1 prototype · Simulated AI · For demonstration only</span>
        </div>
      </footer>
    </div>
  );
}

function LogoMark() {
  return <div className="font-bold text-ink">P1 <span className="font-normal text-muted">health workspace</span></div>;
}