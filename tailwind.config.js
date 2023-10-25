/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/webpages/*.html",
            "./src/views/*.ejs",],
  theme: {
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

