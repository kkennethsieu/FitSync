/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#001F3F",
        accent: "#FF6B6B",
        mellow: "#FFD6A5",
        slateish: {
          100: "#f1f5f9",
          200: "#e2e8f0",
          900: "#0f172a",
        },
      },
    },
  },
  plugins: [],
};
