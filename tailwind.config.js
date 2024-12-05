/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'wave': 'wave 25s cubic-bezier(.55,.5,.45,.5) infinite',
      },
      keyframes: {
        wave: {
          '0%': { transform: 'translateX(-90px)' },
          '100%': { transform: 'translateX(85px)' },
        }
      }
    },
  },
  plugins: [],
}