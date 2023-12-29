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
        '@1290': {'max': '1290px'},
        '-1290' : '1290px',
        '@1000' : {'max': '1000px'},
        '-1000' : '1000px',
        '@850' : {'max': '850px'},
        '-850' : '850px',
        '@650' : {'max': '650px'},
        '-650' : '650px',
        '@500' : {'max': '500px'},
        '-400' : '400px'
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
}

