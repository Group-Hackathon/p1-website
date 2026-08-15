import React from "react";
import { Activity, ClipboardList, Clock, Home, LogOut, Sparkles, Smartphone } from "lucide-react";
import Logo from "./Logo";

const items = [
  { id: "demo", label: "3D Mannequin HUD", icon: Sparkles },
  { id: "dashboard", label: "Living Timeline", icon: Clock },
  { id: "summary", label: "Progress & Metrics", icon: Activity },
  { id: "doctor", label: "Doctor Briefing", icon: ClipboardList },
];

export default function Sidebar({ page, setPage, goHome }) {
  return (
    <aside className="hidden lg:flex lg:w-64 shrink-0 flex-col border-r border-line bg-white">
      <div className="p-6 flex items-center justify-between">
        <button onClick={goHome} className="hover:opacity-80 transition">
          <Logo size="sm" />
        </button>
        <span className="rounded-full bg-mint px-2 py-0.5 text-[10px] font-bold text-mint-dark uppercase">
          APK Sync
        </span>
      </div>
      <nav className="flex-1 space-y-1 px-3">
        <button
          onClick={goHome}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold text-muted hover:bg-cream hover:text-ink transition"
        >
          <Home size={19} />
          Back to Overview
        </button>
        <div className="my-3 border-t border-line" />
        {items.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setPage(id)}
            className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
              page === id ? "bg-mint text-mint-dark font-bold shadow-sm" : "text-muted hover:bg-cream hover:text-ink"
            }`}
          >
            <Icon size={19} className={page === id ? "text-mint-dark" : "text-muted"} />
            {label}
          </button>
        ))}
      </nav>
      <div className="m-4 rounded-2xl bg-cream border border-line p-4">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-sage text-sm font-bold text-white shadow-sm">AR</div>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-ink">Alex Rivera</p>
            <p className="text-xs text-muted">Active File #P1-2026</p>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between text-[11px] text-muted border-t border-line/60 pt-2.5">
          <span className="flex items-center gap-1 font-semibold text-sage-dark">
            <Smartphone size={12} /> Android Connected
          </span>
          <span className="font-bold text-ink">85% Ready</span>
        </div>
      </div>
    </aside>
  );
}

