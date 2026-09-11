/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        vesper: {
          bg: '#000000',
          card: '#0a0a0a',
          surface: '#121212',
          border: 'rgba(255, 255, 255, 0.16)',
          borderSoft: 'rgba(255, 255, 255, 0.12)',
          muted: '#9a9a9a',
          stat: '#d8d8d8'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        serif: ['Instrument Serif', 'Times New Roman', 'Times', 'serif']
      }
    },
  },
  plugins: [],
}
