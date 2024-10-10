/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'm-orange': {
          50: '#fff5ed',
          100: '#fee9d6',
          200: '#fdcfab',
          300: '#fbad76',
          400: '#f87c38',
          500: '#f65f19',
          600: '#e7440f',
          700: '#bf310f',
          800: '#982814',
          900: '#7a2414',
          950: '#420e08'
        },
        'm-yellow': {
          50: '#ffffe7',
          100: '#fdffc1',
          200: '#ffff86',
          300: '#fff741',
          400: '#ffe90d',
          500: '#f6d300',
          600: '#d1a100',
          700: '#a67402',
          800: '#895a0a',
          900: '#74490f',
          950: '#442604'
        },
        'm-red': {
          50: '#fff1f3',
          100: '#ffe3e7',
          200: '#ffcbd6',
          300: '#ffa1b4',
          400: '#ff6d8d',
          500: '#fa4572',
          600: '#e71755',
          700: '#c30d47',
          800: '#a30e43',
          900: '#8c0f40',
          950: '#4e031e'
        }
      },
    },
  },
  plugins: [],
}

