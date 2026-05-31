/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"DM Sans"', 'sans-serif'],
        display: ['"Fraunces"', 'serif'],
      },
      colors: {
        ink:   { DEFAULT: '#0f172a', light: '#1e293b', muted: '#475569' },
        leaf:  { DEFAULT: '#15803d', light: '#dcfce7', dark: '#14532d' },
        amber: { DEFAULT: '#d97706', light: '#fffbeb', dark: '#78350f' },
        rose:  { DEFAULT: '#be123c', light: '#fff1f2' },
        violet:{ DEFAULT: '#4f46e5', light: '#eef2ff', dark: '#3730a3' },
        slate: { 50: '#f8fafc', 100: '#f1f5f9', 200: '#e2e8f0', 300: '#cbd5e1',
                 400: '#94a3b8', 500: '#64748b', 600: '#475569', 700: '#334155',
                 800: '#1e293b', 900: '#0f172a' },
      },
    },
  },
  plugins: [],
}
