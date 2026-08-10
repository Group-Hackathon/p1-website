/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#111111",
        muted: "#666666",
        mint: "#F1F1F1",
        teal: "#222222",
        tealDark: "#000000",
        cream: "#F7F7F7",
        line: "#D9D9D9",
      },
      boxShadow: {
        soft: "0 20px 60px rgba(16, 42, 43, 0.08)",
      },
    },
  },
  plugins: [],
};