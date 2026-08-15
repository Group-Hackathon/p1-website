import React from "react";

export default function Logo({ size = "md", className = "" }) {
  const sizes = { sm: "h-8", md: "h-10", lg: "h-14" };
  return (
    <img
      src="/logo.png"
      alt="P1 Logo"
      className={`${sizes[size] || sizes.md} w-auto rounded-2xl shadow-sm object-contain ${className}`}
    />
  );
}

