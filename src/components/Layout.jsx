import React from "react";
import { Bell, ChevronDown } from "lucide-react";
import Sidebar from "./Sidebar";

export default function Layout({ page, setPage, children }) {
  return (
    <div className="min-h-screen bg-cream">
      <div className="flex min-h-screen">
        <Sidebar page={page} setPage={setPage} />
        <main className="min-w-0 flex-1">
          <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-line/70 bg-cream/90 px-5 backdrop-blur lg:px-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink">P1 health workspace</p>
              <p className="mt-1 hidden text-sm text-muted sm:block">Your health story, organized for the next conversation.</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-white text-muted">
                <Bell size={18} />
              </button>
              <button className="flex items-center gap-2 rounded-xl border border-line bg-white px-3 py-2">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-ink text-xs font-bold text-white">RK</span>
                <span className="hidden text-sm font-semibold sm:block">Rahma</span>
                <ChevronDown size={15} className="hidden sm:block" />
              </button>
            </div>
          </header>
          <div className="p-5 lg:p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}