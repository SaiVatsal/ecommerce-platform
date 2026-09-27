/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          lime: '#84cc16',
          'lime-light': '#a3e635',
          'lime-dark': '#65a30d',
        }
      }
    },
  },
  plugins: [],
}
