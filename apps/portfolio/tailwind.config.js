const { createGlobPatternsForDependencies } = require('@nrwl/angular/tailwind');
const { join } = require('path');
const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

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
          base: '#0A192f',
          active: '#112240'
        },
        accent: {
          base: '#fd2155',
          active: '#ce0938'
        }
      },
      fontFamily: {
        sans: ['Montserrat', ...defaultTheme.fontFamily.sans]
      }
    },
  },
  plugins: [],
};
