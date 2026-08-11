import React from "react";
import { ExternalLink, Menu, X, Github } from "lucide-react";
import Logo from "./Logo";

export default function Navbar({ onDemo }) {
  const [open, setOpen] = React.useState(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-line/70 bg-cream/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <a href="#home" aria-label="P1 home" className="hover:opacity-80 transition">
          <Logo />
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          <a href="#how-it-works" className="text-sm font-medium text-muted hover:text-ink transition">How it works</a>
          <a href="#why-p1" className="text-sm font-medium text-muted hover:text-ink transition">Why P1</a>
          <a href="https://github.com/Group-Hackathon/p1" target="_blank" rel="noopener" className="text-sm font-medium text-muted hover:text-ink transition inline-flex items-center gap-1.5">
            <Github size={15} /> GitHub
          </a>
          <button onClick={onDemo} className="btn-primary px-4 py-2.5 text-sm">
            Try demo
          </button>
        </nav>
        <button className="rounded-lg p-2 md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="border-t border-line bg-white px-5 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            <a href="#how-it-works" onClick={() => setOpen(false)} className="font-medium text-ink">How it works</a>
            <a href="#why-p1" onClick={() => setOpen(false)} className="font-medium text-ink">Why P1</a>
            <a href="https://github.com/Group-Hackathon/p1" target="_blank" rel="noopener" onClick={() => setOpen(false)} className="font-medium text-ink inline-flex items-center gap-1.5">
              <Github size={15} /> GitHub
            </a>
            <button onClick={() => { setOpen(false); onDemo(); }} className="btn-primary">Try demo</button>
          </div>
        </div>
      )}
    </header>
  );
}
