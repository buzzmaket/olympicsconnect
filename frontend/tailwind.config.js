/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        olympic: {
          blue: '#003DA5',
          gold: '#C9A84C',
          silver: '#9CA3AF',
          lightblue: '#E8F0FA',
        },
        dark: '#111827',
      },
      fontFamily: {
        rubik: ['Rubik', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
