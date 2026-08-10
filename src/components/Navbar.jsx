import React from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import Logo from "./Logo";

export default function Navbar({ onDemo }) {
  const [open, setOpen] = React.useState(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-line/70 bg-cream/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <a href="#home" aria-label="P1 home"><Logo /></a>
        <nav className="hidden items-center gap-8 md:flex">
          <a href="#how-it-works" className="text-sm font-medium text-muted hover:text-ink">How it works</a>
          <a href="#benefits" className="text-sm font-medium text-muted hover:text-ink">Benefits</a>
          <button onClick={onDemo} className="btn-primary px-4 py-2.5 text-sm">
            Try demo <ArrowRight size={16} />
          </button>
        </nav>
        <button className="rounded-lg p-2 md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="border-t border-line bg-white px-5 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            <a href="#how-it-works" onClick={() => setOpen(false)} className="font-medium">How it works</a>
            <a href="#benefits" onClick={() => setOpen(false)} className="font-medium">Benefits</a>
            <button onClick={() => { setOpen(false); onDemo(); }} className="btn-primary">Try demo</button>
          </div>
        </div>
      )}
    </header>
  );
}