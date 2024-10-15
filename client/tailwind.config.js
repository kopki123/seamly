/** @type {import('tailwindcss').Config} */

export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#EBE3D5',
          DEFAULT: '#B0A695',
          dark: '#776B5D',
        },
      }
    },
  },
  plugins: [],
};

