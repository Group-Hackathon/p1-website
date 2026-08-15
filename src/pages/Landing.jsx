import React from "react";
import { ExternalLink, Github, Smartphone, BarChart3, Camera, Shield, FileText, Check, MoveRight } from "lucide-react";
import Navbar from "../components/Navbar";
import Logo from "../components/Logo";
import { howItWorks, trackingTypes } from "../data/appFeatures";

function PhoneFrame({ src, alt, label }) {
  return (
    <div className="group mx-auto w-[150px] sm:w-[180px] md:w-[240px] lg:w-[260px]">
      <div className="overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] border-[2px] sm:border-[3px] border-ink/15 bg-ink p-1 sm:p-1.5 shadow-soft transition group-hover:-translate-y-1">
        <div className="overflow-hidden rounded-[1.5rem] sm:rounded-[2rem]">
          <img src={src} alt={alt} className="w-full" loading="lazy" />
        </div>
      </div>
      {label && (
        <p className="mt-2 text-center text-[11px] sm:text-sm font-semibold text-ink">{label}</p>
      )}
    </div>
  );
}

export default function Landing({ onDemo, onPrivacy }) {
  return (
    <div id="home" className="min-h-screen bg-cream">
      <Navbar onDemo={onDemo} />

      {/* Hero */}
      <section className="relative overflow-hidden pt-24 lg:pt-32">
        <div className="absolute -right-32 top-20 h-96 w-96 rounded-full bg-accent-light blur-3xl opacity-60" />
        <div className="absolute -left-32 top-72 h-64 w-64 rounded-full bg-white blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-8 lg:gap-14 px-4 sm:px-5 pb-16 lg:pb-32 lg:grid-cols-[1.05fr_.95fr] lg:px-8">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-ink/12 bg-white px-3 py-1.5 text-[11px] font-bold text-muted">
              v1.0.14 · Available on Google Play
            </div>
            <h1 className="max-w-3xl text-3xl sm:text-5xl lg:text-7xl font-black leading-[1.05] tracking-[-0.03em] text-ink">
              Walk into your appointment with a file ready.
            </h1>
            <p className="mt-4 sm:mt-6 max-w-xl text-base sm:text-lg leading-7 sm:leading-8 text-muted">
              P1 captures what happens between doctor visits — pain, photos, temperature, notes — and compiles it into a clear, one-page physician briefing.
            </p>
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row sm:flex-wrap gap-2.5 sm:gap-3">
              <button onClick={onDemo} className="btn-primary text-sm sm:text-base px-5 sm:px-6 py-3 sm:py-3.5 w-full sm:w-auto justify-center">
                Try the demo <MoveRight size={18} />
              </button>
              <a href="https://play.google.com/store/apps/details?id=com.preappointment1.app" target="_blank" rel="noopener" className="btn-secondary text-sm sm:text-base px-5 sm:px-6 py-3 sm:py-3.5 w-full sm:w-auto justify-center">
                <Smartphone size={18} /> Google Play
              </a>
              <a href="https://github.com/Group-Hackathon/p1" target="_blank" rel="noopener" className="btn-secondary text-sm sm:text-base px-5 py-3 sm:py-3.5 w-full sm:w-auto justify-center">
                <Github size={18} /> GitHub
              </a>
            </div>
            <p className="mt-4 text-[11px] text-muted">Prototype only · Simulated data · Not medical advice</p>
          </div>

          <div className="hidden lg:block relative">
            <div className="rounded-[2rem] border border-line bg-white p-4 shadow-soft">
              <div className="rounded-[1.5rem] bg-ink p-5 text-white">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-white/70">This week's story</span>
                  <span className="rounded-full bg-accent/30 px-2 py-1 text-[10px] font-bold">DEMO</span>
                </div>
                <p className="mt-5 text-2xl font-bold">Headache + fatigue</p>
                <p className="mt-2 text-sm leading-6 text-white/60">Recurring over the last 7 days, with shorter sleep.</p>
                <div className="mt-7 grid grid-cols-3 gap-2">
                  <div className="rounded-xl bg-white/10 p-3"><p className="text-[10px] text-white/50">Headache</p><p className="mt-1 font-bold">5 days</p></div>
                  <div className="rounded-xl bg-white/10 p-3"><p className="text-[10px] text-white/50">Fatigue</p><p className="mt-1 font-bold">4/5</p></div>
                  <div className="rounded-xl bg-white/10 p-3"><p className="text-[10px] text-white/50">Sleep</p><p className="mt-1 font-bold">6.5h</p></div>
                </div>
              </div>
              <div className="px-4 pt-4 pb-2">
                <div className="flex items-center gap-2 text-sm font-bold text-ink">
                  <BarChart3 size={16} /> Quick overview
                </div>
                <p className="mt-3 text-sm leading-6 text-muted">"The most noticeable change is shorter sleep alongside increased afternoon fatigue."</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Screenshots */}
      <section className="border-y border-line bg-white py-12 sm:py-20 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-5 lg:px-8">
          <div className="text-center">
            <span className="inline-block rounded-full bg-mint px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-mint-dark">
              In Action • Android Jetpack Compose
            </span>
            <h2 className="section-title mt-3 text-2xl sm:text-4xl">See P1 on device.</h2>
            <p className="mt-3 text-muted max-w-xl mx-auto text-sm sm:text-base">
              Built with our custom Stitch Sage & Mint design tokens, offline-first Room DB, and interactive 3D robot body.
            </p>
          </div>
          <div className="mt-8 sm:mt-12 flex sm:grid sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6 overflow-x-auto sm:overflow-visible pb-4 sm:pb-0 -mx-4 sm:mx-0 px-4 sm:px-0 snap-x sm:snap-none">
            <div className="shrink-0 w-[160px] sm:w-auto snap-center"><PhoneFrame src="/screenshots/screen_home.png" alt="P1 Real-Time Hub" label="Home Hub" /></div>
            <div className="shrink-0 w-[160px] sm:w-auto snap-center"><PhoneFrame src="/screenshots/screen_voice.png" alt="P1 Voice Logger" label="Voice Check-in" /></div>
            <div className="shrink-0 w-[160px] sm:w-auto snap-center"><PhoneFrame src="/screenshots/screen_3d_body.png" alt="P1 3D Robot HUD" label="3D Robot HUD" /></div>
            <div className="shrink-0 w-[160px] sm:w-auto snap-center"><PhoneFrame src="/screenshots/screen_timeline.png" alt="P1 Chronology Timeline" label="Timeline Log" /></div>
            <div className="shrink-0 w-[160px] sm:w-auto snap-center"><PhoneFrame src="/screenshots/screen_report.png" alt="P1 Doctor Briefing PDF" label="Doctor Briefing" /></div>
          </div>
        </div>
      </section>


      {/* How it works */}
      <section id="how-it-works" className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-5 lg:px-8">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-muted">How it works</p>
          <h2 className="section-title mt-3 text-2xl sm:text-4xl">From scattered notes to a useful visit summary.</h2>
          <p className="mt-3 max-w-2xl text-base sm:text-lg leading-7 sm:leading-8 text-muted">Four steps. About two minutes a day. One clear file for your doctor.</p>
          <div className="mt-8 sm:mt-12 grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
            {howItWorks.map((item) => (
              <div key={item.step} className="group rounded-3xl border border-line bg-white p-6 transition hover:shadow-soft">
                <span className="text-4xl font-black text-line group-hover:text-ink/15 transition">{item.step}</span>
                <h3 className="mt-3 text-xl font-bold">{item.title}</h3>
                <p className="mt-2 leading-7 text-muted text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why P1 */}
      <section id="why-p1" className="border-y border-line bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-muted">Why P1</p>
              <h2 className="section-title mt-3">Make the time before a visit count.</h2>
              <p className="mt-5 max-w-xl leading-7 text-muted">
                Health information is fragmented across memory, notes, apps, conversations. P1 brings the story together — without pretending to replace a clinician.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  "A simple daily check-in (~2 minutes)",
                  "3D body map to mark exactly where it hurts",
                  "Readable trends instead of raw logs",
                  "A doctor-ready one-page visit briefing",
                  "Designed with privacy at the core",
                  "Works offline, syncs when connected"
                ].map((x) => (
                  <div key={x} className="flex items-center gap-3">
                    <div className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent-light text-accent"><Check size={15} /></div>
                    <span className="font-semibold text-sm">{x}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-ink p-7 text-white sm:translate-y-6">
                <BarChart3 className="text-white/70" size={24} />
                <h3 className="mt-8 text-xl font-bold">See trends</h3>
                <p className="mt-3 text-sm leading-6 text-white/60">Understand how symptoms change over time, not just how they feel today.</p>
              </div>
              <div className="rounded-3xl bg-accent/5 border border-accent/20 p-7">
                <Camera className="text-accent" size={24} />
                <h3 className="mt-8 text-xl font-bold">Capture detail</h3>
                <p className="mt-3 text-sm leading-6 text-muted">Photos with ghost overlay. Consistent framing day after day.</p>
              </div>
              <div className="rounded-3xl border border-line bg-white p-7">
                <Shield className="text-ink" size={24} />
                <h3 className="mt-8 text-xl font-bold">Stay in control</h3>
                <p className="mt-3 text-sm leading-6 text-muted">Your entries are information, not a diagnosis. Request deletion anytime.</p>
              </div>
              <div className="rounded-3xl bg-ink p-7 text-white sm:-translate-y-6">
                <FileText className="text-white/70" size={24} />
                <h3 className="mt-8 text-xl font-bold">Doctor-ready PDF</h3>
                <p className="mt-3 text-sm leading-6 text-white/60">One page. Charts, photos, questions. Share via QR code.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tracking types */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-5 lg:px-8">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-muted">Tracking</p>
          <h2 className="section-title mt-3">What you can track today.</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {trackingTypes.map((t) => (
              <div key={t.name} className={`rounded-2xl border p-5 ${t.available ? "border-line bg-white" : "border-dashed border-line/60 bg-cream opacity-60"}`}>
                <div className="flex items-center justify-between">
                  <h3 className="font-bold">{t.name}</h3>
                  {t.available ? (
                    <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-bold text-green-700">Available</span>
                  ) : (
                    <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-bold text-muted">Coming soon</span>
                  )}
                </div>
                <p className="mt-2 text-sm leading-6 text-muted">{t.levels}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open source callout */}
      <section className="border-y border-line bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-5 text-center lg:px-8">
          <Github size={28} className="mx-auto text-ink" />
          <h2 className="mt-4 text-xl sm:text-2xl font-bold">Open source, privacy-first.</h2>
          <p className="mt-3 text-sm sm:text-base text-muted leading-7">
            P1 is built in the open. Explore the code, deploy your own backend, or contribute.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row flex-wrap justify-center gap-3">
            <a href="https://github.com/Group-Hackathon/p1" target="_blank" rel="noopener" className="btn-primary text-sm sm:text-base w-full sm:w-auto justify-center">
              <Github size={17} /> Main repo
            </a>
            <a href="https://github.com/Group-Hackathon/p1-website" target="_blank" rel="noopener" className="btn-secondary text-sm sm:text-base w-full sm:w-auto justify-center">
              Website source <ExternalLink size={15} />
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ink py-16 sm:py-24 text-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-5 text-center lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight sm:text-4xl">Ready to try it?</h2>
          <p className="mt-4 text-base sm:text-lg leading-7 sm:leading-8 text-white/60">
            Open the interactive demo — enter any symptom note and see how P1 turns everyday observations into a clear health story.
          </p>
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-center gap-3">
            <button onClick={onDemo} className="inline-flex items-center gap-2 rounded-xl bg-white px-5 sm:px-6 py-3 sm:py-3.5 font-bold text-ink transition hover:bg-gray-100 justify-center text-sm sm:text-base">
              Launch demo <MoveRight size={18} />
            </button>
            <a href="https://play.google.com/store/apps/details?id=com.preappointment1.app" target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-5 sm:px-6 py-3 sm:py-3.5 font-semibold text-white transition hover:bg-white/10 justify-center text-sm sm:text-base">
              <Smartphone size={18} /> Install on Play Store
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-line bg-white">
        <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
          <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
            <div>
              <Logo />
              <p className="mt-3 max-w-xs text-sm leading-6 text-muted">
                Walk into your next appointment with a file ready — not with half-remembered details.
              </p>
              <p className="mt-3 text-xs text-muted">Living Patient Memory · XPRIZE Gemini Hackathon</p>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-ink">Product</p>
                <div className="mt-3 space-y-2">
                  <a href="#how-it-works" className="block text-sm text-muted hover:text-ink transition">How it works</a>
                  <button onClick={onDemo} className="block text-sm text-muted hover:text-ink transition">Interactive demo</button>
                  <a href="https://play.google.com/store/apps/details?id=com.preappointment1.app" target="_blank" rel="noopener" className="block text-sm text-muted hover:text-ink transition">Google Play</a>
                </div>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-ink">Open source</p>
                <div className="mt-3 space-y-2">
                  <a href="https://github.com/Group-Hackathon/p1" target="_blank" rel="noopener" className="block text-sm text-muted hover:text-ink transition">Main repo</a>
                  <a href="https://github.com/Group-Hackathon/p1-website" target="_blank" rel="noopener" className="block text-sm text-muted hover:text-ink transition">Website source</a>
                  <a href="https://github.com/Group-Hackathon/p1/blob/main/ARCHITECTURE.md" target="_blank" rel="noopener" className="block text-sm text-muted hover:text-ink transition">Architecture</a>
                </div>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-ink">Contact</p>
                <div className="mt-3 space-y-2">
                  <a href="mailto:opendatahive@gmail.com" className="block text-sm text-muted hover:text-ink transition">Email us</a>
                  <a href="https://play.google.com/store/apps/details?id=com.preappointment1.app" target="_blank" rel="noopener" className="block text-sm text-muted hover:text-ink transition">Support</a>
                  <button onClick={onPrivacy} className="block text-sm text-muted hover:text-ink transition">Privacy</button>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10 flex flex-col gap-3 border-t border-line pt-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
            <span>P1 prototype · Simulated data · For demonstration only</span>
            <span>© {new Date().getFullYear()} Pre-Appointment 1</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
