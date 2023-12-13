/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html, js}",
            "./src/**/*.{ejs,html,js}",],
  theme: {
    fontFamily: {
      'sans': ['Roboto', 'Segoe UI Symbol'],
    },
    extend: {
      screens: {
        'tall': { 'raw': '(max-height: 100vh)' },
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
}

