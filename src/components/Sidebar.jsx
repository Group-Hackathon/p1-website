import React from "react";
import { Activity, ClipboardList, LayoutDashboard, LogOut, MessageSquareText, Home } from "lucide-react";
import Logo from "./Logo";

const items = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "summary", label: "Health Summary", icon: Activity },
  { id: "doctor", label: "Doctor Visit", icon: ClipboardList },
  { id: "demo", label: "Interactive Demo", icon: MessageSquareText },
];

export default function Sidebar({ page, setPage, goHome }) {
  return (
    <aside className="hidden lg:flex lg:w-64 shrink-0 flex-col border-r border-line bg-white">
      <div className="p-6">
        <button onClick={goHome} className="hover:opacity-80 transition">
          <Logo size="sm" />
        </button>
      </div>
      <nav className="flex-1 space-y-1 px-3">
        <button
          onClick={goHome}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold text-muted hover:bg-cream hover:text-ink transition"
        >
          <Home size={19} />
          Back to site
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
            <Icon size={19} />
            {label}
          </button>
        ))}
      </nav>
      <div className="m-4 rounded-2xl bg-cream border border-line p-4">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-sage text-sm font-bold text-white">AR</div>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-ink">Alex Rivera</p>
            <p className="text-xs text-muted">Patient 1</p>
          </div>
        </div>
        <button className="mt-4 flex items-center gap-2 text-xs font-semibold text-muted hover:text-ink transition">
          <LogOut size={14} /> Sign out
        </button>
      </div>
    </aside>
  );
}

