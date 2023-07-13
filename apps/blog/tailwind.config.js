const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      colors: {
        ...colors,
        primary: {
          base: '#0a1a2f',
          active: '#112240',
        },
        accent: {
          base: colors.teal[300],
          active: colors.teal[200],
        },
      },
      fontFamily: {
        sans: ['Proza Libre', ...defaultTheme.fontFamily.sans],
        display: ['Cormorant Garamond', ...defaultTheme.fontFamily.serif],
      },
    },
  },
  plugins: [],
};
