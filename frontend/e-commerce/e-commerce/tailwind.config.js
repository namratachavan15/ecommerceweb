/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#070B14',
          50: '#F4F6FB',
          100: '#E7EBF5',
          200: '#8993AC',
          300: '#5B6584',
          400: '#333C57',
          500: '#171F36',
          600: '#111729',
          700: '#0C111F',
          800: '#090D18',
          900: '#070B14',
        },
        volt: {
          DEFAULT: '#4F7CFF',
          50: '#EEF2FF',
          100: '#DCE4FF',
          200: '#B3C4FF',
          300: '#89A4FF',
          400: '#6C8FFF',
          500: '#4F7CFF',
          600: '#2F5CF0',
          700: '#2148C9',
          800: '#1A3A9E',
          900: '#152F7E',
        },
        amp: {
          DEFAULT: '#FFB13B',
          50: '#FFF8EC',
          100: '#FFEFD1',
          200: '#FFDE9F',
          300: '#FFCC6D',
          400: '#FFBE4D',
          500: '#FFB13B',
          600: '#F0930F',
          700: '#C6760C',
        },
      },
      fontFamily: {
        display: ['"Sora"', 'sans-serif'],
        sans: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(79,124,255,0.35), 0 8px 30px -8px rgba(79,124,255,0.45)',
        card: '0 1px 0 0 rgba(255,255,255,0.04) inset, 0 10px 30px -12px rgba(0,0,0,0.6)',
      },
      backgroundImage: {
        grid: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
}