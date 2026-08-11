/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0F172A",
        muted: "#64748B",
        mint: "#F1F5F9",
        teal: "#1E293B",
        tealDark: "#0F172A",
        cream: "#F8FAFC",
        line: "#E2E8F0",
        accent: "#2563EB",
        "accent-light": "#EFF6FF",
        "pain-low": "#10B981",
        "pain-med": "#F59E0B",
        "pain-high": "#EF4444",
      },
      boxShadow: {
        soft: "0 20px 60px rgba(15, 23, 42, 0.08)",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "-apple-system", "sans-serif"],
      },
    },
  },
  plugins: [],
};