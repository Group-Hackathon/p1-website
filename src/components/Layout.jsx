import React from "react";
import { Sparkles, Clock, Activity, ClipboardList, Home, Menu, X } from "lucide-react";
import Sidebar from "./Sidebar";

export default function Layout({ page, setPage, goHome, children }) {
  const [mobOpen, setMobOpen] = React.useState(false);

  const items = [
    { id: "demo", label: "3D HUD", icon: Sparkles },
    { id: "dashboard", label: "Timeline", icon: Clock },
    { id: "summary", label: "Progress", icon: Activity },
    { id: "doctor", label: "Doctor", icon: ClipboardList },
  ];

  return (
    <div className="min-h-screen bg-cream text-ink">
      <div className="flex min-h-screen">
        <Sidebar page={page} setPage={setPage} goHome={goHome} />
        <main className="min-w-0 flex-1 pb-16 lg:pb-0">
          <header className="sticky top-0 z-30 flex h-16 lg:h-20 items-center justify-between border-b border-line/70 bg-cream/90 px-4 lg:px-8 backdrop-blur">
            <div className="flex items-center gap-3">
              <button onClick={goHome} className="text-xs font-bold uppercase tracking-[0.18em] text-muted hover:text-ink transition flex items-center gap-1.5">
                <Home size={14} className="text-sage" /> P1 Medical
              </button>
              <p className="hidden text-xs sm:text-sm text-muted sm:block">· Active Consultation File (Live APK Telemetry)</p>
            </div>
            <div className="flex items-center gap-2 lg:gap-3">
              <div className="hidden sm:flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1.5 text-xs font-bold text-ink shadow-sm">
                <span className="h-2 w-2 rounded-full bg-[#3DDC84] animate-pulse" />
                Live Sync Active
              </div>
              <button className="lg:hidden grid h-9 w-9 place-items-center rounded-xl border border-line bg-white" onClick={() => setMobOpen(!mobOpen)}>
                {mobOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </header>

          {mobOpen && (
            <div className="lg:hidden border-b border-line bg-white px-4 py-3">
              <button onClick={() => { goHome(); setMobOpen(false); }} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-muted hover:bg-cream">
                <Home size={18} /> Back to Overview
              </button>
              <div className="my-2 border-t border-line" />
              {items.map(({ id, label, icon: Icon }) => (
                <button key={id} onClick={() => { setPage(id); setMobOpen(false); }} className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold ${page === id ? "bg-mint text-mint-dark font-bold" : "text-muted hover:bg-cream"}`}>
                  <Icon size={18} /> {label}
                </button>
              ))}
            </div>
          )}

          <div className="p-4 lg:p-8">{children}</div>
        </main>
      </div>

      {/* Mobile bottom nav (Faithful port of StitchBottomNavBar in Android) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-line bg-white/95 backdrop-blur px-2 py-1.5 safe-bottom shadow-lg">
        <div className="flex items-center justify-around">
          {items.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setPage(id)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition ${
                page === id ? "bg-mint text-mint-dark font-bold scale-105" : "text-muted hover:text-ink"
              }`}
            >
              <Icon size={18} />
              <span className="text-[10px]">{label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
