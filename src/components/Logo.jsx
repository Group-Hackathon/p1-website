import React from "react";

export default function Logo({ size = "md" }) {
  const sizes = { sm: "h-8", md: "h-10", lg: "h-12" };
  return (
    <img
      src="/logo.webp"
      alt="P1"
      className={`${sizes[size] || sizes.md} w-auto rounded-xl`}
    />
  );
}
