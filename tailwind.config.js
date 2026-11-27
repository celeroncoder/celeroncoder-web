/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Early-web defaults: Times for everything, Courier for code.
        sans: ['"Times New Roman"', 'Times', 'serif'],
        serif: ['"Times New Roman"', 'Times', 'serif'],
        mono: ['"Courier New"', 'Courier', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
