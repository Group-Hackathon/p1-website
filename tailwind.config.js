/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#191E1C",
        muted: "#6B7470",
        sage: {
          DEFAULT: "#2D524A",
          dark: "#1D3B34",
          light: "#456F65",
        },
        mint: {
          DEFAULT: "#E5EFEA",
          dark: "#265B4E",
          accent: "#3DDC84",
        },
        cream: "#F7F9F8",
        line: "#ECEFEF",
        accent: "#2D524A",
        "accent-light": "#E5EFEA",
        "pain-low": "#2E7D32",
        "pain-med": "#D97706",
        "pain-high": "#DC2626",
        "pain-extreme": "#991B1B",
      },
      boxShadow: {
        soft: "0 20px 60px rgba(45, 82, 74, 0.06)",
        card: "0 4px 20px rgba(25, 30, 28, 0.04)",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "-apple-system", "sans-serif"],
      },
    },
  },
  plugins: [],
};