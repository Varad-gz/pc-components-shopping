/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/webpages/*.html",
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

