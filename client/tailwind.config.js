/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'

module.exports = {
  content: [    './index.html',
  './src/**/*.{js,ts,jsx,tsx,vue}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Karla', 'sans-serif'],
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
