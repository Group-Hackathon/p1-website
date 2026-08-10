import React from "react";

export default function Logo({ light = false }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className={`grid h-9 w-9 place-items-center rounded-xl ${light ? "bg-white text-ink" : "bg-ink text-white"}`}>
        <span className="text-lg font-black">P1</span>
      </div>
      <span className={`text-xl font-bold tracking-tight ${light ? "text-white" : "text-ink"}`}>P1</span>
    </div>
  );
}