/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'black': '#000000',
      'offwhite': '#ECF2FF',
      'bluish': '#B4C7ED',
      'navyblue': '#13224f',
      'lightwhite': '#d0d3db',
      'darkblue': '#091945',
      'green': '#139277',
      'red': '#c92a8f',
      'lightblue': '#8A9BCA',
      'lightblue2': '#7b98c6',
      'blue': '#0C1B44',
      'indigo': '#1e1666',
      'aqua': '#00ffff',
      'deepskyblue': '#00bfff',
      'cornflowerblue': '#6495ed',
      'mediumslateblue': '#7b68ee',
      'giant': '#ac5652',
      'rosequartzpink': '#c257a6',
      'brilliantazure': '#359eff',
      'freshair': '#b6ddff'
    },
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.25rem' }],
      base: ['1rem', { lineHeight: '1.5rem' }],
      lg: ['1.125rem', { lineHeight: '2rem' }],
      xl: ['1.25rem', { lineHeight: '1.75rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      '5xl': ['3rem', { lineHeight: '1.25' }],
      '6xl': ['3.75rem', { lineHeight: '1' }],
      '7xl': ['4.5rem', { lineHeight: '1.25' }],
      '8xl': ['6rem', { lineHeight: '1' }],
      '9xl': ['8rem', { lineHeight: '1.25rem' }],
    },
  },
  plugins: [],
}
