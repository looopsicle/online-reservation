/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // pastikan path sesuai struktur folder kamu
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', ...defaultTheme.fontFamily.sans],
        ruthie: ['Ruthie', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'brand-pink': '#FFDCDC',
        'brand-darker-pink': '#e94e77',
        // bisa tambah warna lain
      },
    },
  },
  plugins: [],
};