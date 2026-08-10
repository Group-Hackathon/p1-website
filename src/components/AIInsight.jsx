import React from "react";
import { Sparkles } from "lucide-react";

export default function AIInsight({ children, title = "AI demo insight" }) {
  return (
    <div className="rounded-2xl border border-ink/15 bg-gray-100/50 p-5">
      <div className="mb-3 flex items-center gap-2 text-sm font-bold text-ink">
        <Sparkles size={17} /> {title}
      </div>
      <div className="text-sm leading-6 text-ink/80">{children}</div>
    </div>
  );
}