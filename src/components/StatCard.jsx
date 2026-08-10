import React from "react";

export default function StatCard({ label, value, detail, icon: Icon }) {
  return (
    <div className="glass rounded-2xl p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted">{label}</p>
          <p className="mt-2 text-2xl font-bold tracking-tight">{value}</p>
          <p className="mt-1 text-xs text-muted">{detail}</p>
        </div>
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-gray-100 text-ink">
          <Icon size={19} />
        </div>
      </div>
    </div>
  );
}