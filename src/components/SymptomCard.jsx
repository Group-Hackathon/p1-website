import React from "react";
import { Clock3, MoreHorizontal } from "lucide-react";

export default function SymptomCard({ symptom }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-line bg-white p-4">
      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gray-100 text-sm font-bold text-ink">
        {symptom.severity}/5
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-bold">{symptom.name}</h3>
          <button className="text-muted hover:text-ink" aria-label="More options"><MoreHorizontal size={18} /></button>
        </div>
        <p className="truncate text-sm text-muted">{symptom.note}</p>
        <p className="mt-1 flex items-center gap-1 text-xs text-muted"><Clock3 size={12} /> {symptom.time}</p>
      </div>
    </div>
  );
}