import React from "react";
import { Bell, Home, ChevronDown, LayoutDashboard, Activity, ClipboardList, MessageSquareText, Menu, X } from "lucide-react";
import Sidebar from "./Sidebar";

export default function Layout({ page, setPage, goHome, children }) {
  const [mobOpen, setMobOpen] = React.useState(false);

  const items = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "summary", label: "Summary", icon: Activity },
    { id: "doctor", label: "Doctor", icon: ClipboardList },
    { id: "demo", label: "Demo", icon: MessageSquareText },
  ];

  return (
    <div className="min-h-screen bg-cream">
      <div className="flex min-h-screen">
        <Sidebar page={page} setPage={setPage} goHome={goHome} />
        <main className="min-w-0 flex-1 pb-16 lg:pb-0">
          <header className="sticky top-0 z-30 flex h-16 lg:h-20 items-center justify-between border-b border-line/70 bg-cream/90 px-4 lg:px-8 backdrop-blur">
            <div className="flex items-center gap-3">
              <button onClick={goHome} className="text-xs font-semibold uppercase tracking-[0.18em] text-muted hover:text-ink transition flex items-center gap-1">
                <Home size={14} /> P1
              </button>
              <p className="hidden text-sm text-muted sm:block">Your health story, organized for the next conversation.</p>
            </div>
            <div className="flex items-center gap-2 lg:gap-3">
              <button className="grid h-9 w-9 lg:h-10 lg:w-10 place-items-center rounded-xl border border-line bg-white text-muted">
                <Bell size={17} />
              </button>
              <button className="hidden sm:flex items-center gap-2 rounded-xl border border-line bg-white px-3 py-2">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-accent text-xs font-bold text-white">AR</span>
                <span className="hidden text-sm font-semibold sm:block">Alex Rivera</span>
                <ChevronDown size={15} className="hidden sm:block" />
              </button>
              <button className="lg:hidden grid h-9 w-9 place-items-center rounded-xl border border-line bg-white" onClick={() => setMobOpen(!mobOpen)}>
                {mobOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </header>

          {mobOpen && (
            <div className="lg:hidden border-b border-line bg-white px-4 py-3">
              <button onClick={() => { goHome(); setMobOpen(false); }} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-muted hover:bg-cream">
                <Home size={18} /> Back to site
              </button>
              <div className="my-2 border-t border-line" />
              {items.map(({ id, label, icon: Icon }) => (
                <button key={id} onClick={() => { setPage(id); setMobOpen(false); }} className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold ${page === id ? "bg-gray-100 text-ink" : "text-muted hover:bg-cream"}`}>
                  <Icon size={18} /> {label}
                </button>
              ))}
            </div>
          )}

          <div className="p-4 lg:p-8">{children}</div>
        </main>
      </div>

      {/* Mobile bottom nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-line bg-white/95 backdrop-blur px-2 py-1.5 safe-bottom">
        <div className="flex items-center justify-around">
          {items.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setPage(id)}
              className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-xl min-w-[64px] transition ${page === id ? "text-ink" : "text-muted"}`}
            >
              <Icon size={20} />
              <span className="text-[10px] font-semibold">{label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
